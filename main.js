import express from "express";
import cors from "cors";

// routes import 
import userRouter from "./routes/user.routes.js";

const app = express();

app.use(cors(), express.json());

app.get("/", async (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running successfully",
    });
});
/**
 * @access {url} http://localhost:9000/api/user/set-profile-pic
 */
app.use('/api/users', userRouter);

export default app;
