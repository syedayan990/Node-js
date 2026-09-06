const path = require("path");
const rootDir = require("../utils/PathUtil");
const Home = require("../Models/Home");
const { error } = require("console");

exports.getAddHome = (req, res, next) => {
  res.render("Host/Edit-home", {
    home: { houseName: "", Price: "", Location: "", Rating: "", PhotoUrl: "", Description: "" },
    pagetitle: "Add Home",
  });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true"; // Convert the query parameter to a boolean
  Home.findById(homeId).then(([rows]) => {
    const home = rows[0];
    if (!home) {
      console.log("Home not found for editing wuth Id : ");
      return res.redirect("/host/home-list"); // Redirect to  home list if the home is not found
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
  Home.fetchall().then(([registeredhomes, fields]) => {
    console.log("Host homes fetched:", registeredhomes);
    res.render("Host/Host-home-list", {
      registeredhomes: registeredhomes,
      pagetitle: "Host Home List",
      currentPage: "host-home-list",
    });
  });
};

exports.postAddHome = (req, res, next) => {
  console.log("STEP 1: postAddHome route HIT. req.body =", req.body);

  const { houseName, Price, Location, Rating, PhotoUrl, Description} = req.body;

  const home = new Home(houseName, Price, Location, Rating, PhotoUrl, Description);
  console.log("STEP 2: Home object banaya:", home);

  home.save()
    .then((result) => {
      console.log("STEP 3: save() SUCCESS. Result:", result);
      res.redirect("/host/host-home-list");
    })
    .catch((error) => {
      console.log("STEP 3: save() FAILED with error:", error);
      res.redirect("/host/host-home-list");
    });
};

exports.postEditHome = (req, res, next) => {
  const { id, houseName, Price, Location, Rating, PhotoUrl, Description } = req.body;

  const home = new Home(houseName, Price, Location, Rating, PhotoUrl, Description, id);
  home.save()
    .then(() => {
      res.redirect("/host/host-home-list");
    })
    .catch((error) => {
      console.log("error while editing home", error);
      res.redirect("/host/host-home-list");
    });
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("come to delete items", homeId);
  Home.deleteById(homeId).then(() => {
    res.redirect("/host/host-home-list");
  }).catch((error) => {
    console.log("error while deleting", error);
  });
};