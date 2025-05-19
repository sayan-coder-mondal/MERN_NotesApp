// const {postSignup,postLogin,getLogout, checkCookies}=require("../controllers/authControllers");
// const express=require("express");
// const auth=require("../middleware/auth");
// const router = express.Router();

import { postSignup, postLogin, getLogout, checkCookies } from "../controllers/authControllers.js";
import express from "express";
import {auth} from "../middleware/auth.js";
const router = express.Router();


router.post("/signup",postSignup);
router.post("/login",postLogin);
router.get("/logout",auth,getLogout);
router.get("/checkCookies",auth,checkCookies);

// module.exports=router;
export default router;