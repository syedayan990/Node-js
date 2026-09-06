const path = require("path");
const rootDir = require("../utils/PathUtil");
const { error } = require("console");

exports.getLogin = (req, res, next) => {
  res.render("Auth/Login", {
    pagetitle: "Login",
    isLoggedIn: false,
  });
};

// exports.postLogin = (req, res, next) => {
//   console.log(req.body);
//   res.cookie("isLoggedIn", true);
//   req.isLoggedIn = true;
//   res.redirect("/");
// } ;
//           OR
exports.postLogin = (req, res, next) => {
  console.log(req.body);
  req.session.isLoggedIn = true;
  res.redirect("/");
};

// exports.postLogout = (req, res, next) => {
//   res.clearCookie("isLoggedIn" , false);
//   res.redirect("/Login");

// }

exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/Login");
  });
};
