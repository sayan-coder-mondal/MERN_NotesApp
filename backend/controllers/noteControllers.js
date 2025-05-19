// const note = require("../models/note");
// const user = require("../models/user");

import {note} from "../models/note.js";
import {user} from "../models/user.js";


export const addNote = async (req, res) => {
    try {
        if (req.authenticatedUser) {
            const note_data = new note({
                uid: req.authenticatedUser._id,
                title: req.body.title,
                note: req.body.note
            });
            await note_data.save();
            return res.status(201).json({ success: true, message: "New note added" });
        }
        else {
            return res.status(404).json({ success: false, message: "User is not existed" })
        }
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}


export const updateNote = async (req, res) => {
    try {
        if (req.authenticatedUser) {
            const a = req.params.id;
            // console.log(req.authenticatedUser._id);
            const noteData = await note.findOne({ _id: a });
            // console.log(noteData);
            // console.log(noteData.uid);
            if (noteData) {
                if (`${req.authenticatedUser._id}` != `${noteData.uid}`) {
                    return res.status(201).json({ success: false, message: "You cannot update" })
                }
            }
            else {
                return res.status(404).json({ success: false, message: "Note does not exist" })
            }

            const update = {
                title: req.body.title,
                note: req.body.note
            }
            const UpdatedNote = await note.updateOne({ _id: a }, update, { new: true, runValidators: true });
            // console.log(UpdatedNote);

            return res.status(201).json({ success: true, message: "Note updated successfully" })
        }
        else {
            return res.status(404).json({ success: false, message: "User is not existed" });
        }
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}


export const deleteNote = async (req, res) => {
    try {
        if (req.authenticatedUser) {
            const a = req.params.id;
            const noteData = await note.findOne({ _id: a });
            if (noteData) {
                if (`${req.authenticatedUser._id}` != `${noteData.uid}`) {
                    return res.status(201).json({ success: false, message: "You cannot delete" })
                }
            }
            else {
                return res.status(404).json({ success: false, message: "Note does not exist" })
            }
            const DeletedNote = await note.deleteOne({ _id: a });
            // console.log(DeletedNote);

            return res.status(201).json({ success: true, message: "Note deleted successfully" });
        }
        else {
            return res.status(404).json({ success: false, message: "User does not exist" });
        }
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}


export const allNotes = async (req, res) => {
    try {
        if (req.authenticatedUser) {
            // console.log(req.query.sortType);

            // const all_notes=await note.find({uid:req.authenticatedUser._id});
            // return res.status(200).json({success:true,all_notes});

            if (req.query.sortType == "Recently Created") {
                const all_notes = await note.find({ uid: req.authenticatedUser._id }).sort({ createdAt: -1 });
                return res.status(200).json({ success: true, all_notes });
            }
            else if (req.query.sortType == "Earliest Created") {
                const all_notes = await note.find({ uid: req.authenticatedUser._id }).sort({ createdAt: 1 });
                return res.status(200).json({ success: true, all_notes });
            }
            else if (req.query.sortType == "Recently Updated") {
                const all_notes = await note.find({ uid: req.authenticatedUser._id }).sort({ updatedAt: -1 });
                return res.status(200).json({ success: true, all_notes });
            }
            else if (req.query.sortType == "Earliest Updated") {
                const all_notes = await note.find({ uid: req.authenticatedUser._id }).sort({ updatedAt: 1 });
                return res.status(200).json({ success: true, all_notes });
            }
            else{
                const all_notes=await note.find({uid:req.authenticatedUser._id});
                return res.status(200).json({success:true,all_notes});
            }

        }
        else {
            return res.status(404).json({ success: false, message: "User does not exist" });
        }
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}


export const singleNote = async (req, res) => {
    try {
        if (req.authenticatedUser) {
            const id = req.params.id;
            const target_note = await note.findOne({ _id: id, uid: req.authenticatedUser._id });
            return res.status(200).json({ success: true, target_note });
        }
        else {
            return res.status(404).json({ success: false, message: "User does not exist" });
        }
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}