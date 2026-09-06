const path = require("path");
const rootDir = require("../utils/PathUtil");
const Home = require("../Models/Home");

exports.getAddHome = (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "addHome.html"));
};

exports.postAddHome = (req, res, next) => {
//   console.log("Home register successfully for :", req.body);

  const { houseName, Price, Location, Rating, PhotoUrl } = req.body; // Destructuring the request body to extract the home details

  const home = new Home(houseName, Price, Location, Rating, PhotoUrl);
  home.save();
  res.sendFile(path.join(rootDir, "views", "HomeAdded.html"));
};

exports.getHomes = (req, res, next) => {
  const registeredhomes = Home.fetchall(registeredhomes => {
    console.log(registeredhomes);
    res.render("home", {
      registeredhomes: registeredhomes,
      pagetitle: "Airbnb Home",
      currentPage: "home",
    });
  });
//   console.log(registeredhomes);
//   res.render("home", {
//     registeredhomes: registeredhomes,
//     pagetitle: "Airbnb Home",
//     currentPage: "home",
//   });
};

// exports.registeredhomes = registeredhomes; // ✅ export bhi karo, taaki userRouter use kar sake
