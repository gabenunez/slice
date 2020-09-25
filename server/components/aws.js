const AWS = require('aws-sdk');

const s3bucket = new AWS.S3({
    accessKeyId: process.env.IAM_USER_KEY,
    secretAccessKey: process.env.IAM_USER_SECRET,
    Bucket: process.env.S3_BUCKET_NAME
});

exports.uploadFileToS3 = (filePath, fileData) => {
    return new Promise((res, rej) => {
        s3bucket.createBucket(() => {
            // Determine the content type so the files doesn't automatically download in the browser.
            // https://github.com/aws/aws-toolkit-azure-devops/issues/3#issuecomment-322965643
            const extn = filePath.split('.').pop();
            let contentType = 'application/octet-stream';
            if (extn == 'html') contentType = "text/html";
            if (extn == 'css') contentType = "text/css";
            if (extn == 'js') contentType = "application/javascript";
            if (extn == 'png' || extn == 'jpg' || extn == 'gif') contentType = "image/" + extn;

            const s3Params = {
                Bucket: process.env.S3_BUCKET_NAME,
                Key: filePath,
                Body: fileData,
                ContentType: contentType
            };
    
            s3bucket.upload(s3Params, (err, data) => {
                if (err) return rej(err);

                // Return the S3 URL
                return res(data.Location);
            });
        });
    });
}