import boto3
import zipfile
import StringIO
import mimetypes

def lambda_handler(event, context):
    s3 = boto3.resource('s3')
    portfolio_bucket = s3.Bucket('portfolio.johnaslinger.com')
    build_bucket = s3.Bucket('portfoliobuild.johnaslinger.com')
    build_bucket.download_file('portfoliobuild.zip', 'portfoliobuild.zip')
    portfolio_zip = StringIO.StringIO()
    build_bucket.download_fileobj('portfoliobuild.zip', portfolio_zip)
    with zipfile.ZipFile(portfolio_zip) as myzip:
        for nm in myzip.namelist():
            obj = myzip.open(nm)
            portfolio_bucket.upload_fileobj(obj, nm, ExtraArgs={'ContentType':mimetypes.guess_type(nm)[0]})
            portfolio_bucket.Object(nm).Acl().put(ACL='public-read')

    print "Job done!"
    return 'Hello from Lambda'
