import AWS from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import { v4 as uuid } from "uuid";

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_BUCKET_REGION
})

const upload = (bucket) => 
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
        })
    })

export const setProfilePic = (req, res, next) => {
    const avatar = req.file;
    console.log("New avatar", avatar);
    // const uploadSingle = upload('wrkr-test').single("avatar");
    // console.log("Herreeee!!!!!!")
    // uploadSingle((req, res, err) => {
    //     if (err) return res.status(400).json({ success: true, message: err.message});
    //     console.log(req.file);
    //     res.status(200).json({
    //         success: true,
    //         data: req.file
    //     })
    // }) 

    
}