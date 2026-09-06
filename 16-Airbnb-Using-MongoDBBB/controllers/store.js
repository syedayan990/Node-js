const path = require("path");
const rootDir = require("../utils/PathUtil");
const Home = require("../Models/Home");
// const Favourite = require("../Models/favourite");
const Favourite = require("../Models/favourite");

exports.getIndex = (req, res, next) => {
  const registeredhomes = Home.fetchall().then((registeredhomes, fields) => {
    res.render("store/Index", {
      registeredhomes: registeredhomes,
      pagetitle: "Airbnb Home",
      currentPage: "Index",
    });
  });
};

exports.getHomes = (req, res, next) => {
  const registeredhomes = Home.fetchall().then((registeredhomes, fields) => {
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
  Favourite.getFavourite()
    .then((favourites) => {
      const favIds = favourites.map((fav) => fav.homeId);
      Home.fetchall().then((registeredhomes) => {
        const favouriteHomes = registeredhomes.filter((home) =>
          favIds.includes(home._id.toString())
        );
        res.render("store/favourite-list", {
          favouriteHomes: favouriteHomes,
          pagetitle: "My Favourite List",
          currentPage: "favourite",
        });
      });
    })
    .catch((err) => console.log(err));
};

exports.postAddTofavourite = (req, res, next) => {
  const homeId = req.body.id;
  const fav = new Favourite(homeId);
  fav
    .save()
    .then((result) => {
      console.log("fav added : ", result);
    })
    .catch((error) => {
      console.error("Error adding to favourites:", error);
    })
    .finally(() => {
      res.redirect("/favourite");
    });
};


exports.postRemoveFromfavourite = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.deleteById(homeId)
    .then(() => {
      res.redirect("/favourite");
    })
    .catch((error) => {
      console.log("error while removing from favourites : ", error);
      res.redirect("/favourite");
    });
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;

  Home.findById(homeId)
    .then((home) => {
      // const homeFound = home[0];
      if (!home) {
        console.log("Home not found for id : ", homeId);
        return res.redirect("/homes");
      }
      res.render("store/home-detail", {
        home: home,
        pagetitle: "Home Details",
        currentPage: "home",
      });
    })
    .catch((error) => {
      console.log("Error fetching home details:", error);
    });
};
