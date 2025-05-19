// const mongoose = require('mongoose');

import mongoose from "mongoose";

// note schema
const noteSchema = new mongoose.Schema({
    uid:{
        type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
    },

    title: {
      type: String,
      maxlength: 30,
      required: true
   },

   note: {
      type: String,
      maxlength: 1000
   },
},
   {
      timestamps: true
   });

export const note = new mongoose.model("note", noteSchema);

// module.exports = note;