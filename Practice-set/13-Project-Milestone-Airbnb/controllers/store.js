const path = require("path");
const rootDir = require("../utils/PathUtil");
const Home = require("../Models/Home");

exports.getIndex = (req, res, next) => {
  const registeredhomes = Home.fetchall(registeredhomes => {
    res.render("store/Index", {
      registeredhomes: registeredhomes,
      pagetitle: "Airbnb Home",
      currentPage: "Index",
    });
  });
};


exports.getHomes = (req, res, next) => {
  const registeredhomes = Home.fetchall(registeredhomes => {
    console.log(registeredhomes);
    res.render("store/home-list", {
      registeredhomes: registeredhomes,
      pagetitle: "Home List",
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


exports.getbookings = (req, res, next) => {
  res.render("store/Booking", {
    pagetitle: "My Booking",
    currentPage: "booking",
  });
};

exports.getfavouriteList = (req, res, next) => {
  Home.fetchall((registeredhomes) => {
    console.log(registeredhomes);
    res.render("store/favourite-list", {
      registeredhomes: registeredhomes,
      pagetitle: "My Favourite List",
      currentPage: "favourite",
    });
  });
};