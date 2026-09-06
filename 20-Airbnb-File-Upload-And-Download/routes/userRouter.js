//code module---
const path = require("path"); //ye module use kiya h humne html file ko lane ke liye

//external module
const express = require("express");

const userRouter = express.Router();



const userHomeCntroller = require("../controllers/store");    //ye humne controller mai use kiya h isliye humne yaha import kiya h
userRouter.get("/", userHomeCntroller.getIndex);
userRouter.get("/homes", userHomeCntroller.getHomes);
userRouter.get("/booking", userHomeCntroller.getbookings);
userRouter.get("/favourite", userHomeCntroller.getfavouriteList);

userRouter.get("/homes/:homeId", userHomeCntroller.getHomeDetails); //dynamic path  
userRouter.post("/favourite", userHomeCntroller.postAddTofavourite);
userRouter.post("/favourite/delete/:homeId", userHomeCntroller.postRemoveFromfavourite);


module.exports = userRouter;
