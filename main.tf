provider "aws" {
  region = "us-east-1"
}

# --- VARIABLES (Update these!) ---
variable "domain_name" {
  default = "johnaslinger.com" # Replace or ignore if not using custom domain yet
  type    = string
}

variable "bucket_name" {
  default = "my-portfolio-site-aslinger" # Must be unique globally
  type    = string
}

variable "my_email" {
  default = "mr.aslinger@gmail.com" # Replace with your real email for the contact form
  type    = string
}

# ==============================================================================
# 1. WEBSITE INFRASTRUCTURE (S3 & CloudFront)
# ==============================================================================

resource "aws_s3_bucket" "website_bucket" {
  bucket = var.bucket_name
}

resource "aws_cloudfront_origin_access_control" "oac" {
  name                              = "s3-portfolio-oac"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    domain_name              = aws_s3_bucket.website_bucket.bucket_regional_domain_name
    origin_id                = "S3Origin"
    origin_access_control_id = aws_cloudfront_origin_access_control.oac.id
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3Origin"

    forwarded_values {
      query_string = false
      cookies { forward = "none" }
    }

    viewer_protocol_policy = "redirect-to-https"
  }

  restrictions {
    geo_restriction { restriction_type = "none" }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
    # If using a custom domain with ACM, uncomment below:
    # acm_certificate_arn = aws_acm_certificate.cert.arn
    # ssl_support_method  = "sni-only"
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

# S3 Bucket Policy to allow CloudFront to read files
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

# ==============================================================================
# 2. GITHUB ACTIONS DEPLOYMENT PERMISSIONS
# ==============================================================================

resource "aws_iam_openid_connect_provider" "github" {
  url             = "https://token.actions.githubusercontent.com"
  client_id_list  = ["sts.amazonaws.com"]
  thumbprint_list = ["6938fd4d98bab03faadb97b34396831e3780aea1"]
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
        StringLike = { "token.actions.githubusercontent.com:sub" = "repo:aslinger/my-portfolio:*" }
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
        Action   = ["s3:PutObject", "s3:ListBucket", "s3:DeleteObject"]
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

# ==============================================================================
# 3. SERVERLESS BACKEND (Contact Form)
# ==============================================================================

resource "aws_ses_email_identity" "my_email" {
  email = var.my_email
}

# Prepare the Lambda Code (Zip)
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
      { Action = ["ses:SendEmail"], Effect = "Allow", Resource = "*" },
      { Action = ["logs:CreateLogGroup", "logs:CreateLogStream", "logs:PutLogEvents"], Effect = "Allow", Resource = "arn:aws:logs:*:*:*" }
    ]
  })
}

# API Gateway
resource "aws_apigatewayv2_api" "api" {
  name          = "portfolio_api"
  protocol_type = "HTTP"
  cors_configuration {
    allow_origins = ["*"]
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
  value = aws_s3_bucket.website_bucket.id
}