const path = require("path");
const rootDir = require("../utils/PathUtil");
const Home = require("../Models/Home");
// const Favourite = require("../Models/favourite");
const Favourite = require("../Models/favourite");

exports.getIndex = (req, res, next) => {
  console.log("session value : ", req.session);
  const registeredhomes = Home.find().then((registeredhomes, fields) => {
    res.render("store/Index", {
      registeredhomes: registeredhomes,
      pagetitle: "Airbnb Home",
      currentPage: "Index",
      isLoggedIn: req.isLoggedIn
    });
  });
};

exports.getHomes = (req, res, next) => {
  const registeredhomes = Home.find().then((registeredhomes, fields) => {
    console.log(registeredhomes);
    res.render("store/home-list", {
      registeredhomes: registeredhomes,
      pagetitle: "Home List",
      currentPage: "home",
      isLoggedIn: req.isLoggedIn

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
    isLoggedIn: req.isLoggedIn

  });
};

// exports.getfavouriteList = (req, res, next) => {
//   Favourite.find()
//     .then((favourites) => {
//       const favIds = favourites.map((fav) => fav.houseId.toString());
//       Home.find().then((registeredhomes) => {
//         const favouriteHomes = registeredhomes.filter((home) =>
//           favIds.includes(home._id.toString())
//         );
//         res.render("store/favourite-list", {
//           favouriteHomes: favouriteHomes,
//           pagetitle: "My Favourite List",
//           currentPage: "favourite",
//         });
//       });
//     })
//     .catch((err) => console.log(err));
// };
//           or
exports.getfavouriteList = (req, res, next) => {
  Favourite.find()
    .populate("houseId")
    .then((favourites) => {
      const favouriteHomes = favourites
        .map((fav) => fav.houseId)
        .filter((home) => home !== null); // agar koi home delete ho chuka ho to null aa sakta hai

      res.render("store/favourite-list", {
        favouriteHomes: favouriteHomes,
        pagetitle: "My Favourite List",
        currentPage: "favourite",
        isLoggedIn: req.isLoggedIn
      });
    })
    .catch((err) => console.log(err));
};



exports.postAddTofavourite = (req, res, next) => {
  const homeId = req.body.id;
  Favourite.findOne({houseId: homeId}).then((fav)=>{
    if(fav){
      console.log("Already marked as favourite");
    }
    // res.redirect("/favourite");
    else{
      fav = new Favourite({houseId: homeId});
      fav.save().then((result)=>{
        console.log("Fav added: ",result);
      });
    }
    res.redirect("/favourite");
  }).catch(error => {
    console.log("Error While marking favourite: ", error);
  });

  // const fav = new Favourite(homeId);
  // fav
  //   .save()
  //   .then((result) => {
  //     console.log("fav added : ", result);
  //   })
  //   .catch((error) => {
  //     console.error("Error adding to favourites:", error);
  //   })
  //   .finally(() => {
  //     res.redirect("/favourite");
  //   });
};

exports.postRemoveFromfavourite = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.findOneAndDelete({houseId: homeId})
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
        isLoggedIn: req.isLoggedIn
      });
    })
    .catch((error) => {
      console.log("Error fetching home details:", error);
    });
};
