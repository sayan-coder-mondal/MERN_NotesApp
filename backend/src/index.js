// require("dotenv").config();
// const express=require("express");
// const app=express();
// const cookieParser = require("cookie-parser");
// const database = require("../config/mongodb");
// const authRoutes=require('../routes/authRoutes');
// const noteRoutes=require('../routes/noteRoutes');
// const path=require("path");



import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import cookieParser from "cookie-parser";
import database from "../config/mongodb.js";
database();
import authRoutes from "../routes/authRoutes.js";
import noteRoutes from "../routes/noteRoutes.js";
import path from "path";
import fs from "fs";



const __dirname = path.resolve();


app.use(express.json());

// Use cookie-parser middleware
app.use(cookieParser());


// app.use("/api",userRoutes);
app.use("/api", authRoutes);
app.use("/api", noteRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));


app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});


app.listen(8000, () => {
    console.log("App is running...");
})