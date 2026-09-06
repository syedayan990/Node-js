//code module---
const path = require("path"); //ye module use kiya h humne html file ko lane ke liye

//external module
const express = require("express");

const authRouter = express.Router();

const authController = require('../controllers/authController');
authRouter.get("/Login", authController.getLogin);
authRouter.post("/Login", authController.postLogin);
authRouter.post("/Logout", authController.postLogout);
authRouter.get("/SignUp", authController.getSignUp);
authRouter.post("/SignUp", authController.postSignUp);




module.exports = authRouter;
