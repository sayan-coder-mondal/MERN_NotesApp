// const mongoose = require("mongoose");

import mongoose from "mongoose";

// // connection creation
// mongoose.connect(process.env.databaseURL)
//     .then(() => { console.log("Connection successfull...") })
//     .catch((err) => { console.log(err) });



// connection creation
const database = async () => {
    try {
      await mongoose.connect(process.env.databaseURL);
      console.log("Connection successful...");
    } catch (err) {
      console.error("MongoDB connection error:", err);
    }
  };
  
  export default database;