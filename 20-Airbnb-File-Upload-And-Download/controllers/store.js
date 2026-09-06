// const path = require("path");
// const rootDir = require("../utils/PathUtil");
// const Home = require("../Models/Home");
// // const Favourite = require("../Models/favourite");
// // const Favourite = require("../Models/favourite");
// // const favourite = require("../Models/favourite");
// const User = require("../Models/user");

// exports.getIndex = (req, res, next) => {
//   console.log("session value : ", req.session);
//   const registeredhomes = Home.find().then((registeredhomes, fields) => {
//     res.render("store/Index", {
//       registeredhomes: registeredhomes,
//       pagetitle: "Airbnb Home",
//       currentPage: "Index",
//       isLoggedIn: req.isLoggedIn,
//       user: req.session.user,
//     });
//   });
// };

// exports.getHomes = (req, res, next) => {
//   const registeredhomes = Home.find().then((registeredhomes, fields) => {
//     console.log(registeredhomes);
//     res.render("store/home-list", {
//       registeredhomes: registeredhomes,
//       pagetitle: "Home List",
//       currentPage: "home",
//       isLoggedIn: req.isLoggedIn,
//       user: req.session.user,
//     });
//   });
//   //   console.log(registeredhomes);
//   //   res.render("home", {
//   //     registeredhomes: registeredhomes,
//   //     pagetitle: "Airbnb Home",
//   //     currentPage: "home",
//   //   });
// };

// // exports.registeredhomes = registeredhomes; // ✅ export bhi karo, taaki userRouter use kar sake

// exports.getbookings = (req, res, next) => {
//   res.render("store/Booking", {
//     pagetitle: "My Booking",
//     currentPage: "booking",
//     isLoggedIn: req.isLoggedIn,
//     user: req.session.user,
//   });
// };

// // exports.getfavouriteList = (req, res, next) => {
// //   Favourite.find()
// //     .then((favourites) => {
// //       const favIds = favourites.map((fav) => fav.houseId.toString());
// //       Home.find().then((registeredhomes) => {
// //         const favouriteHomes = registeredhomes.filter((home) =>
// //           favIds.includes(home._id.toString())
// //         );
// //         res.render("store/favourite-list", {
// //           favouriteHomes: favouriteHomes,
// //           pagetitle: "My Favourite List",
// //           currentPage: "favourite",
// //         });
// //       });
// //     })
// //     .catch((err) => console.log(err));
// // };
// //           or
// exports.getfavouriteList = async (req, res, next) => {
//   const userId = req.session.user._id;
//   const user = await User.findById(userId).populate("favourite");

//   const favouriteHomes = favourites
//     .map((fav) => fav.houseId)
//     .filter((home) => home !== null); // agar koi home delete ho chuka ho to null aa sakta hai

//   res.render("store/favourite-list", {
//     favouriteHomes: user.Favourite,
//     pagetitle: "My Favourite List",
//     currentPage: "favourite",
//     isLoggedIn: req.isLoggedIn,
//     user: req.session.user,
//   });
//   Favourite.find()
//     .populate("houseId")
//     .then((favourites) => {

//     });
// };

// exports.postAddTofavourite = async (req, res, next) => {
//   const homeId = req.body.id;
//   const userId = req.session.user._id;
//   const user = await User.findById(userId);
//  if (!user.favourite.some((id) => id.toString() === homeId)) {
//     user.favourite.push(homeId);
//     await user.save();
//   }

  


  
//       res.redirect("/favourite");
    

//   // const fav = new Favourite(homeId);
//   // fav
//   //   .save()
//   //   .then((result) => {
//   //     console.log("fav added : ", result);
//   //   })
//   //   .catch((error) => {
//   //     console.error("Error adding to favourites:", error);
//   //   })
//   //   .finally(() => {
//   //     res.redirect("/favourite");
//   //   });
// };

// exports.postRemoveFromfavourite = async (req, res, next) => {
//   const homeId = req.params.homeId;

//    const userId = req.session.user._id;
//   const user = await User.findById(userId);
//   if (user.favourite.some((id) => id.toString() === homeId)) {
//     user.favourite = user.favourite.filter((id) => id.toString() !== homeId);
//     await user.save();
//   }

//   // Favourite.findOneAndDelete({ houseId: homeId })
//   //   .then(() => {
//   //     res.redirect("/favourite");
//   //   })
//   //   .catch((error) => {
//   //     console.log("error while removing from favourites : ", error);
//       res.redirect("/favourite");
// }
// //     });
// // };

// exports.getHomeDetails = (req, res, next) => {
//   const homeId = req.params.homeId;

//   Home.findById(homeId)
//     .then((home) => {
//       // const homeFound = home[0];
//       if (!home) {
//         console.log("Home not found for id : ", homeId);
//         return res.redirect("/homes");
//       }
//       res.render("store/home-detail", {
//         home: home,
//         pagetitle: "Home Details",
//         currentPage: "home",
//         isLoggedIn: req.isLoggedIn,
//         user: req.session.user,
//       });
//     })
//     .catch((error) => {
//       console.log("Error fetching home details:", error);
//     });
// };




const Home = require("../Models/Home");
const User = require("../Models/user");

exports.getIndex = async (req, res, next) => {
  try {
    const registeredhomes = await Home.find();

    res.render("store/Index", {
      registeredhomes,
      pagetitle: "Airbnb Home",
      currentPage: "Index",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  } catch (error) {
    console.log("Error while fetching homes:", error);
    next(error);
  }
};

exports.getHomes = async (req, res, next) => {
  try {
    const registeredhomes = await Home.find();

    res.render("store/home-list", {
      registeredhomes,
      pagetitle: "Home List",
      currentPage: "home",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  } catch (error) {
    console.log("Error while fetching homes:", error);
    next(error);
  }
};

exports.getbookings = (req, res, next) => {
  res.render("store/Booking", {
    pagetitle: "My Booking",
    currentPage: "booking",
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

exports.getfavouriteList = async (req, res, next) => {
  try {
    if (!req.session.user) {
      return res.redirect("/Login");
    }

    const user = await User.findById(req.session.user._id).populate("favourite");

    if (!user) {
      return res.redirect("/Login");
    }

    const favouriteHomes = user.favourite.filter((home) => home !== null);

    res.render("store/favourite-list", {
      favouriteHomes,
      pagetitle: "My Favourite List",
      currentPage: "favourite",
      isLoggedIn: req.isLoggedIn,
      user: user,
    });
  } catch (error) {
    console.log("Error while fetching favourite homes:", error);
    next(error);
  }
};

exports.postAddTofavourite = async (req, res, next) => {
  try {
    if (!req.session.user) {
      return res.redirect("/Login");
    }

    const homeId = req.body.id;
    const userId = req.session.user._id;

    const user = await User.findById(userId);

    if (!user) {
      return res.redirect("/Login");
    }

    const alreadyFavourite = user.favourite.some(
      (id) => id.toString() === homeId.toString()
    );

    if (!alreadyFavourite) {
      user.favourite.push(homeId);
      await user.save();
    }

    res.redirect("/favourite");
  } catch (error) {
    console.log("Error while adding favourite:", error);
    next(error);
  }
};

exports.postRemoveFromfavourite = async (req, res, next) => {
  try {
    if (!req.session.user) {
      return res.redirect("/Login");
    }

    const homeId = req.params.homeId;
    const userId = req.session.user._id;

    const user = await User.findById(userId);

    if (!user) {
      return res.redirect("/Login");
    }

    user.favourite = user.favourite.filter(
      (fav) => fav.toString() !== homeId.toString()
    );

    await user.save();

    res.redirect("/favourite");
  } catch (error) {
    console.log("Error while removing favourite:", error);
    next(error);
  }
};

exports.getHomeDetails = async (req, res, next) => {
  try {
    const homeId = req.params.homeId;

    const home = await Home.findById(homeId);

    if (!home) {
      console.log("Home not found for id:", homeId);
      return res.redirect("/homes");
    }

    res.render("store/home-detail", {
      home,
      pagetitle: "Home Details",
      currentPage: "home",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  } catch (error) {
    console.log("Error fetching home details:", error);
    next(error);
  }
};