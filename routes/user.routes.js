import express from "express";
import { upload } from "../config/aws.multer.config.js";
import { setProfilePic } from "../controllers/user.controller.js";
const router = express.Router({
    caseSensitive: true
})
router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Responding"
    })
})
router.post('/set-profile-pic', upload('wrkr-test').single('avatar'),setProfilePic);

export default router;