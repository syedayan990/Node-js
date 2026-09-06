//code module---
const path = require("path"); //ye module use kiya h humne html file ko lane ke liye

//external module
const express = require("express");

const userRouter = express.Router();



const userHomeCntroller = require("../controllers/Homes");    //ye humne controller mai use kiya h isliye humne yaha import kiya h
userRouter.get("/", userHomeCntroller.getHomes);

module.exports = userRouter;
