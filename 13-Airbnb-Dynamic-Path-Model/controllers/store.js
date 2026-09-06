const path = require("path");
const rootDir = require("../utils/PathUtil");
const Home = require("../Models/Home");
const favourite  = require("../Models/favourite");

exports.getIndex = (req, res, next) => {
  const registeredhomes = Home.fetchall((registeredhomes) => {
    res.render("store/Index", {
      registeredhomes: registeredhomes,
      pagetitle: "Airbnb Home",
      currentPage: "Index",
    });
  });
};

exports.getHomes = (req, res, next) => {
  const registeredhomes = Home.fetchall((registeredhomes) => {
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
  favourite.getFavourite(favourite => {
    Home.fetchall((registeredhomes) => {
      const favouriteHomes = registeredhomes.filter(home => favourite.includes(home.id));
    console.log(registeredhomes);
    res.render("store/favourite-list", {
      favouriteHomes: favouriteHomes,
      pagetitle: "My Favourite List",
      currentPage: "favourite",
    })
  });
})
  
};

exports.postAddTofavourite = (req, res, next) => {
  console.log("come to favourite list", req.body);
  favourite.addToFavourite(req.body.id, (error) => {
    if (error) {
      console.error("Error adding to favourites:" , error);
    }
    res.redirect("/favourite");
  });
};

exports.postRemoveFromfavourite = (req, res, next) => {
 const homeId =req.params.homeId;
 favourite.deleteById(homeId, error => {
  if (error){
     console.loh('error while removing from favourites : ', error);
  }
  res.redirect("/favourite");
 })
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;

  Home.findById(homeId, (homeFound) => {
    console.log("home is found ",homeFound);
    if (!homeFound) {
      console.log("Home not found for id : ");
      return res.redirect("/homes");
    }
    res.render("store/home-detail", {
      home: homeFound,
      pagetitle: "Home Details",
      currentPage: "home",
    });
  });
};