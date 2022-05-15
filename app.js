import app from "./main.js";
import mongoose from "mongoose";
import { config } from "dotenv";
config();

mongoose
    .connect(process.env.MONGO_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        // useCreateIndex: true
    })
    .then(async () => {
        app.listen(9000, () => {
        console.log("Server is listening at port 9000!");
        });
        console.log("Database connected successfully");
    })
    .catch((err) => {
        console.log(`Error: ${err.message}`);
    });
