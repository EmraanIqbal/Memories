import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./config/database.js";
import postRouter from "./routes/posts.routes.js";

const app = express();
dotenv.config();
const port = process.env.PORT || 5000;
connectDb();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//load Routes
app.use("/posts", postRouter);

app.listen(port, () => console.log(`App is Listening on Port ${port}`));
