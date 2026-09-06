// const path = require("path");
// const rootDir = require("../utils/PathUtil");

// exports.notFound = (req, res, next) => {
//   res.status(404).sendFile(path.join(rootDir, "views", "404Page.html"));
// };

exports.notFound = (req, res, next) => {
  res.status(404).render("404Page", {
    pagetitle: "Page Not Found",
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

