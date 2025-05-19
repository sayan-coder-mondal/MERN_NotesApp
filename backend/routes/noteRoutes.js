//  const {addNote,updateNote,deleteNote,allNotes,singleNote}=require("../controllers/noteControllers");
//  const express=require("express");
//  const auth=require("../middleware/auth");
//  const router = express.Router();

import { addNote, updateNote, deleteNote, allNotes, singleNote } from "../controllers/noteControllers.js";
import express from "express";
import {auth} from "../middleware/auth.js";
const router = express.Router();


router.post("/addNote", auth, addNote);
router.put("/updateNote/:id", auth, updateNote);
router.delete("/deleteNote/:id", auth, deleteNote);
router.get("/allNotes", auth, allNotes);
router.get("/singleNote/:id", auth, singleNote);

// module.exports = router;
export default router;