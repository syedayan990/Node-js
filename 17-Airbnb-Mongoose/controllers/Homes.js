const path = require("path");
const rootDir = require("../utils/PathUtil");
const Home = require("../Models/Home");
const { error } = require("console");

exports.getAddHome = (req, res, next) => {
  res.render("Host/Edit-home", {
    home: {
      houseName: "",
      Price: "",
      Location: "",
      Rating: "",
      PhotoUrl: "",
      Description: "",
    },
    pagetitle: "Add Home",
  });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true"; // Convert the query parameter to a boolean
  // Home.findById(homeId).then(([rows]) => {
  Home.findById(homeId).then((home) => {
    // const home = rows[0];
    if (!home) {
      console.log("Home not found for editing with Id:", homeId);
      return res.redirect("/host/host-home-list");
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
  Home.find().then((registeredhomes, fields) => {
    console.log("Host homes fetched:", registeredhomes);
    res.render("Host/Host-home-list", {
      registeredhomes: registeredhomes,
      pagetitle: "Host Home List",
      currentPage: "host-home-list",
    });
  });
};

exports.postAddHome = (req, res, next) => {
  console.log("postAddHome route HIT. req.body =", req.body);

  const { houseName, Price, Location, Rating, PhotoUrl, Description } =
    req.body;

  const home = new Home({
    houseName,
    Price,
    Location,
    Rating,
    PhotoUrl,
    Description,
  });
  console.log("Home object banaya:", home);

  home
    .save()
    .then((result) => {
      console.log(" Home save SUCCESS :", result);
      res.redirect("/host/host-home-list");
    })
    .catch((error) => {
      console.log(" Home save() FAILED with error:", error);
      res.redirect("/host/host-home-list");
    });
};

exports.postEditHome = (req, res, next) => {
  const { id, houseName, Price, Location, Rating, PhotoUrl, Description } =
    req.body;

  // const home =   new Home(houseName, Price, Location, Rating, PhotoUrl, Description, id);
  Home.findById(id)
    .then((home) => {
      home.houseName = houseName;
      home.Price = Price;
      home.Location = Location;
      home.Rating = Rating;
      home.PhotoUrl = PhotoUrl;
      home.Description = Description;
      home
        .save()
        .then((result) => {
          console.log("home update", result);
        })
        .catch((error) => {
          console.log("error while editing home", error);
        });
      res.redirect("/host/host-home-list");
    })
    .catch((error) => {
      console.log("Error while finging home ", error);
    });
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("come to delete items", homeId);
  Home.findByIdAndDelete(homeId)
    .then(() => {
      res.redirect("/host/host-home-list");
    })
    .catch((error) => {
      console.log("error while deleting", error);
    });
};
