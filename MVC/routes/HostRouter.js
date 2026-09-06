//core module
const path = require("path"); //ye module use kiya h humne html file ko lane ke liye

//external module
const express = require("express");

const HostRouter = express.Router();
// local module
const rootDir = require("../utils/PathUtil");
const { hostname } = require("os");

const HomesCntroller = require("../controllers/Homes"); //ye humne controller mai use kiya h isliye humne yaha import kiya h
HostRouter.get("/add-home", HomesCntroller.getAddHome);
//ye humne controller mai use kiya h isliye humne yaha import kiya h

HostRouter.post("/add-home", HomesCntroller.postAddHome); //ye humne controller mai use kiya h isliye humne yaha import kiya h

exports.HostRouter = HostRouter;
