import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import UserRoutes from './UserRoutes.js';
import TagRoutes from "./TagRoutes.js";
import VoteRoutes from "./VoteRoutes.js";
import PostRoutes from "./PostRoutes.js";
import QuestionRoutes from "./QuestionRoutes.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3030;


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));

app.get('/',(req,res) => res.status(200).send("Testing..."));

app.use(UserRoutes);
app.use(QuestionRoutes);
app.use(TagRoutes);
app.use(VoteRoutes);
app.use(PostRoutes);

app.listen(port,()=> console.log(`Server listening on localhost : ${port}...`));