// ***ENTRY POINT TO THE BACKEND***

import express from "express";
// This is a default function that comes with nodejs which stands for,
// "file systems"
import { readdirSync } from 'fs';
// Enabling CORS to resolve any conflict regarding the different ports 
// that the frontend and the backend are running upon
import cors from "cors";
// For database 
import mongoose from "mongoose";
const morgan = require("morgan");
require("dotenv").config();



const app = express();

// database connection
mongoose
.connect(process.env.DATABASE)
.then(() => console.log("DB Connected"))
.catch((err) => console.log("DB Connection Error: ", err));



// middleware
app.use(cors());
app.use(morgan("dev"));
// Since data is sent in json format, we must add a middleware
// that processes the data in the proper way
app.use(express.json());



// route middleware
readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));
// app.use('/api', router);


const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

