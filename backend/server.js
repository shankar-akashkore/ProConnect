import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import postsRoutes from "./routes/posts.routes.js" 

dotenv.config();

const app = express();

app.use(cors());

app.use(postsRoutes);

app.use(express.json());

const start = async () => {
    const connectDB = await mongoose.connect("mongodb+srv://shankarakashkore88_db_user:v4zPqUNlJm0aMuGJ@proconnect.qvvxyuu.mongodb.net");

    app.listen(9080, () => {
        console.log("Server is running on 9080");
    })
}

start();