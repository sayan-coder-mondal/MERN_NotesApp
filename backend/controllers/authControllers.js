// const user = require("../models/user");
// const bcrypt = require("bcryptjs");

import {user} from "../models/user.js";
import bcrypt from "bcryptjs";


export const postSignup = async (req, res) => {
    try {
        if(!req.body.name || !req.body.email || !req.body.password || !req.body.confirm_password){
            return res.status(401).json({success:false,message:"Some inputs are missing"});
        }
        const isExist=await user.findOne({email:req.body.email});
        // console.log(isExist);
        if(isExist){
            return res.status(401).json({success:false,message:"Try different email"});
        }
        
        const user_data = new user({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        // console.log(user_data);

        if (req.body.password == req.body.confirm_password) {
            const registered = await user_data.save();
            // console.log(registered);
            // console.log(registered._id);

            // call token
            const token = await user_data.generateAuthToken();
            // console.log("The token part:    " + token);

            // store token in cookie
            // res.cookie(name,value,{options})
            res.cookie("jwt_signup", token, {
                expires: new Date(Date.now() + 20000),
                httpOnly: true
            });

            // res.status(201).json(registered);
            res.status(201).json({ success: true ,message: "New user created" });
        }
        else {
            res.status(200).json({success: false, message: "Password and Confirm Password should be equal" })
        }
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}


export const postLogin = async (req, res) => {
    try {
        const check = await user.findOne({ email: req.body.email });
        if (!check) {
            // console.log("Wrong email");
            return res.status(401).json({ success: false,message:"Wrong email or password" });
        }
        // compare hashed password and enter password
        const isMatch = await bcrypt.compare(req.body.password, check.password);
        if (isMatch) {
            const token = await check.generateAuthToken();
            // console.log("The token part:    " + token);
            // username = check.name;
            // store token in cookie
            // res.cookie(name,value,{options})
            res.cookie("jwt_login", token, {
                // expires: new Date(Date.now() + 20000),
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),    // 7 days from now
                httpOnly: true
            });

            const authUser = await user.findOne({ email: req.body.email }).select('-password');
            res.status(200).json({ success: true,message:"Login successfully", authUser });
            // res.status(200).json({...check,success:true});
            // res.status(200).json({success:true});
        }
        else {
            // console.log("Wrong password");
            res.status(401).json({ success: false,message:"Wrong email or password" });
        }
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}


export const getLogout = async (req, res) => {
    try {
        if (req.authenticatedUser) {
            res.clearCookie("jwt_login");
            res.status(200).json({ success: true ,message:"Logout successfully"});
        }
        else {
            res.status(400).json({success: false, message: error.message });
        }
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}


export const checkCookies=async(req,res)=>{
    try {
        if (req.authenticatedUser) {
            // console.log(false);
            
            res.status(200).json({ success: false ,message:"Cookies available"});
        }
        else {
            // console.log(true);
            
            res.status(200).json({success: true, message: "Cookies unavailable" });
        }
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}