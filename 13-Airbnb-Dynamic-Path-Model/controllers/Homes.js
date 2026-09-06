const path = require("path");
const rootDir = require("../utils/PathUtil");
const Home = require("../Models/Home");
const { error } = require("console");

exports.getAddHome = (req, res, next) => {
  res.render("Host/Edit-home", {
    home: { houseName: "", Price: "", Location: "", Rating: "", PhotoUrl: "" },
    pagetitle: "Add Home",
  });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true"; // Convert the query parameter to a boolean
  Home.findById(homeId, (home) => {
    if (!home) {
      console.log("Home not found for editing wuth Id : ");
      return res.redirect("/host/home-list"); // Redirect to home list if the home is not found
    }
    console.log("homeId", homeId);
    console.log("editing", editing);
    console.log("home", home);
    res.render("Host/Edit-Host-Home", {
      home: home,
      pagetitle: "Edit Home",
    });
  });
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
  res.redirect("/Host/Host-home-list");

};


exports.postEditHome = (req, res, next) => {
  const { id, houseName, Price, Location, Rating, PhotoUrl } = req.body;

  const home = new Home(houseName, Price, Location, Rating, PhotoUrl);
  home.id = id;
  home.save();

  res.redirect("/Host/Host-home-list");
};



exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("come to delete items", homeId);
  Home.deleteById(homeId, (error) => {
    if (error) {
      console.log("error while deleting", error);
    }
    res.redirect("/host/host-home-list");
  });
};
// exports.registeredhomes = registeredhomes; // ✅ export bhi karo, taaki userRouter use kar sake
