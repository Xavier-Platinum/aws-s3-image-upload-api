import AWS from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import { v4 as uuid } from "uuid";

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_BUCKET_REGION
})

const filters = (req, file, cb) => {
    if (file.mimmetype.split("/")[0] === "image" || file.mimmetype.split("/")[1] === ("png"||"jpeg"||"jpg")) {
        cb(null, true)
    }else {
        cb(new Error("Only image files are allowed!"), false);
    }
}

export const upload = (bucket) => 
    multer({
        storage: multerS3({
            s3,
            bucket: bucket,
            metadata:  (req, file, cb) => {
                cb(null, {fieldName: file.fieldname});
            },
            key: (req, file, cb) => {
                cb(null, `uploads/${uuid()}-${file.originalname}`);
            }
        }),
        fileFilter: filters,
        limits: {
            fileSize: 1024 * 1024 * 5, //allowing 5mb files
            files: 1 // receiving just 1 file
        }
    })