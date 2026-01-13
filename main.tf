provider "aws" {
  region = "us-east-1"
}

variable "domain_name" {
  default = "johnaslinger.com"
  type    = string
}

variable "bucket_name" {
  default = "my-portfolio-site-aslinger"
  type    = string
}

variable "my_email" {
  default = "mr.aslinger@gmail.com"
  type    = string
}

variable "github_repo" {
  description = "The repo path for OIDC (e.g., aslinger/my-portfolio)"
  default     = "aslinger/my-portfolio"
  type        = string
}
resource "aws_s3_bucket" "website_bucket" {
  bucket = var.bucket_name
}

resource "aws_cloudfront_origin_access_control" "default" {
  name                              = "s3-portfolio-oac"
  description                       = "Grant CloudFront access to S3"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_distribution" "s3_distribution" {
  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  aliases             = [var.domain_name, "www.${var.domain_name}"]

  origin {
    domain_name              = aws_s3_bucket.website_bucket.bucket_regional_domain_name
    origin_id                = "S3Origin"
    origin_access_control_id = aws_cloudfront_origin_access_control.default.id
  }

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3Origin"

    forwarded_values {
      query_string = false
      cookies { forward = "none" }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  restrictions {
    geo_restriction { restriction_type = "none" }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate_validation.cert.certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  custom_error_response {
    error_caching_min_ttl = 0
    error_code            = 403
    response_code         = 200
    response_page_path    = "/index.html"
  }
  custom_error_response {
    error_caching_min_ttl = 0
    error_code            = 404
    response_code         = 200
    response_page_path    = "/index.html"
  }
}

# S3 Bucket Policy
resource "aws_s3_bucket_policy" "allow_cloudfront" {
  bucket = aws_s3_bucket.website_bucket.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Sid       = "AllowCloudFrontServicePrincipal"
      Effect    = "Allow"
      Principal = { Service = "cloudfront.amazonaws.com" }
      Action    = "s3:GetObject"
      Resource  = "${aws_s3_bucket.website_bucket.arn}/*"
      Condition = {
        StringEquals = { "AWS:SourceArn" = aws_cloudfront_distribution.s3_distribution.arn }
      }
    }]
  })
}

resource "aws_acm_certificate" "cert" {
  domain_name       = var.domain_name
  subject_alternative_names = ["www.${var.domain_name}"]
  validation_method = "DNS"

  lifecycle { create_before_destroy = true }
}

data "aws_route53_zone" "main" {
  name         = var.domain_name
  private_zone = false
}

resource "aws_route53_record" "cert_validation" {
  for_each = {
    for dvo in aws_acm_certificate.cert.domain_validation_options : dvo.domain_name => dvo
  }
  allow_overwrite = true
  name            = each.value.resource_record_name
  records         = [each.value.resource_record_value]
  ttl             = 60
  type            = each.value.resource_record_type
  zone_id         = data.aws_route53_zone.main.zone_id
}

resource "aws_acm_certificate_validation" "cert" {
  certificate_arn         = aws_acm_certificate.cert.arn
  validation_record_fqdns = [for record in aws_route53_record.cert_validation : record.fqdn]
}

# DNS Record: Root Domain (A Record Alias)
resource "aws_route53_record" "root" {
  zone_id = data.aws_route53_zone.main.zone_id
  name    = var.domain_name
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.s3_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.s3_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}

# DNS Record: WWW Subdomain (A Record Alias)
resource "aws_route53_record" "www" {
  zone_id = data.aws_route53_zone.main.zone_id
  name    = "www.${var.domain_name}"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.s3_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.s3_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}

data "tls_certificate" "github" {
  url = "https://token.actions.githubusercontent.com"
}

resource "aws_iam_openid_connect_provider" "github" {
  url             = "https://token.actions.githubusercontent.com"
  client_id_list  = ["sts.amazonaws.com"]
  thumbprint_list = [data.tls_certificate.github.certificates[0].sha1_fingerprint]
}

resource "aws_iam_role" "github_deploy_role" {
  name = "portfolio_deploy_role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRoleWithWebIdentity"
      Effect = "Allow"
      Principal = { Federated = aws_iam_openid_connect_provider.github.arn }
      Condition = {
        StringLike = { "token.actions.githubusercontent.com:sub" = "repo:${var.github_repo}:*" }
      }
    }]
  })
}

resource "aws_iam_role_policy" "deploy_policy" {
  role = aws_iam_role.github_deploy_role.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action   = ["s3:PutObject", "s3:ListBucket", "s3:DeleteObject", "s3:GetBucketLocation"]
        Effect   = "Allow"
        Resource = [aws_s3_bucket.website_bucket.arn, "${aws_s3_bucket.website_bucket.arn}/*"]
      },
      {
        Action   = ["cloudfront:CreateInvalidation", "cloudfront:GetInvalidation"]
        Effect   = "Allow"
        Resource = [aws_cloudfront_distribution.s3_distribution.arn]
      }
    ]
  })
}

resource "aws_ses_email_identity" "my_email" {
  email = var.my_email
}

data "archive_file" "lambda_zip" {
  type        = "zip"
  source_file = "${path.module}/lambda/index.mjs"
  output_path = "${path.module}/lambda/lambda_function.zip"
}

resource "aws_lambda_function" "contact_form" {
  filename         = data.archive_file.lambda_zip.output_path
  function_name    = "portfolio_contact_handler"
  role             = aws_iam_role.lambda_exec.arn
  handler          = "index.handler"
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256
  runtime          = "nodejs20.x"
  timeout          = 10

  environment {
    variables = {
      VERIFIED_EMAIL = var.my_email
    }
  }
}

resource "aws_iam_role" "lambda_exec" {
  name = "portfolio_lambda_role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{ Action = "sts:AssumeRole", Effect = "Allow", Principal = { Service = "lambda.amazonaws.com" } }]
  })
}

resource "aws_iam_role_policy" "lambda_ses_policy" {
  role = aws_iam_role.lambda_exec.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      { Action = ["ses:SendEmail", "ses:SendRawEmail"], Effect = "Allow", Resource = "*" },
      { Action = ["logs:CreateLogGroup", "logs:CreateLogStream", "logs:PutLogEvents"], Effect = "Allow", Resource = "arn:aws:logs:*:*:*" }
    ]
  })
}

# API Gateway
resource "aws_apigatewayv2_api" "api" {
  name          = "portfolio_api"
  protocol_type = "HTTP"
  cors_configuration {
    allow_origins = ["https://${var.domain_name}", "https://www.${var.domain_name}", "http://localhost:5173"] # Added localhost for testing
    allow_methods = ["POST"]
    allow_headers = ["content-type"]
  }
}

resource "aws_apigatewayv2_stage" "default" {
  api_id      = aws_apigatewayv2_api.api.id
  name        = "$default"
  auto_deploy = true
}

resource "aws_apigatewayv2_integration" "lambda_int" {
  api_id           = aws_apigatewayv2_api.api.id
  integration_type = "AWS_PROXY"
  integration_uri  = aws_lambda_function.contact_form.invoke_arn
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "post_contact" {
  api_id    = aws_apigatewayv2_api.api.id
  route_key = "POST /contact"
  target    = "integrations/${aws_apigatewayv2_integration.lambda_int.id}"
}

resource "aws_lambda_permission" "api_gw" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.contact_form.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.api.execution_arn}/*/*/contact"
}

output "api_endpoint" {
  value = "${aws_apigatewayv2_api.api.api_endpoint}/contact"
}

output "cloudfront_distribution_id" {
  value = aws_cloudfront_distribution.s3_distribution.id
}

output "s3_bucket_name" {
  value = aws_s3_bucket.website_bucket.bucket
}

output "github_role_arn" {
  value = aws_iam_role.github_deploy_role.arn
}