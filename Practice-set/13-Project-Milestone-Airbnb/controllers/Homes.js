const path = require("path");
const rootDir = require("../utils/PathUtil");
const Home = require("../Models/Home");

exports.getAddHome = (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "Host", "addHome.html"));
};

exports.geHostHomes = (req, res, next) => {
  Home.fetchall((registeredhomes) => {
    res.render("Host/Host-home-list", {
      registeredhomes: registeredhomes,
      pagetitle: "Host Home List",
      currentPage: "host-home-list",
    });
  });
};

exports.postAddHome = (req, res, next) => {
//   console.log("Home register successfully for :", req.body);

  const { houseName, Price, Location, Rating, PhotoUrl } = req.body; // Destructuring the request body to extract the home details

  const home = new Home(houseName, Price, Location, Rating, PhotoUrl);
  home.save();
 res.sendFile(path.join(rootDir, "views", "Host", "HomeAdded.html"));
};



// exports.registeredhomes = registeredhomes; // ✅ export bhi karo, taaki userRouter use kar sake
