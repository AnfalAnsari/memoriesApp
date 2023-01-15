import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import postRouter from "./routes/posts.js"
import userRouter from "./routes/user.js"
import dotenv from 'dotenv';
const app = express();
dotenv.config();




app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/posts', postRouter)
app.use('/user', userRouter)


const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL)
      .then(() => { app.listen(PORT, console.log(`server running on ${PORT}`)) })
      .catch(error => console.log(error));

