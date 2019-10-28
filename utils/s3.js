const aws = require("aws-sdk");
const fs = require("fs");

////// SECRETS SETUP ////////
let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("../secrets"); // in dev they are in secrets.json which is listed in .gitignore
}

////// SECRETS SETUP ////////

const s3 = new aws.S3({
    accessKeyId: secrets.awsKey,
    secretAccessKey: secrets.awsSecret
});

exports.upload = function(req, res, next) {
    if (!req.file) {
        return res.send(500);
    }
    const { filename, mimetype, size, path } = req.file;

    const promise = s3
        .putObject({
            Bucket: "imageboardgiordana",
            ACL: "public-read",
            Key: filename,
            Body: fs.createReadStream(path),
            ContentType: mimetype,
            ContentLength: size
        })
        .promise();

    promise
        .then(() => {
            next();
            fs.unlink(path, () => {});
        })
        .catch(error => {
            console.log("ERROR IN PROMISE S3:", error);
            res.sendStatus(500);
        });
};
