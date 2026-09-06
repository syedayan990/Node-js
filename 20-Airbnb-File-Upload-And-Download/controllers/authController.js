const path = require("path");
const rootDir = require("../utils/PathUtil");
const { error } = require("console");
const { check, validationResult } = require("express-validator");
const User = require("../Models/user");
const bcrypt = require("bcryptjs");

exports.getLogin = (req, res, next) => {
  res.render("auth/Login", {
    pagetitle: "Login",
    isLoggedIn: false,
    errors: [],
    oldInput: { email: "" },
    user: {},
  });
};

exports.getSignUp = (req, res, next) => {
  res.render("auth/SignUp", {
    pagetitle: "SignUp",
    isLoggedIn: false,
    errors: [],
    oldInput: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      userType: "",
    },
    
    user: {},
  });
};

// exports.postLogin = (req, res, next) => {
//   console.log(req.body);
//   res.cookie("isLoggedIn", true);
//   req.isLoggedIn = true;
//   res.redirect("/");
// } ;
//           OR
exports.postSignUp = [
  check("firstName")
    .trim()
    .isLength({ min: 2 })
    .withMessage("First name should be at least 2 characters long")
    .matches(/^[A-Za-z]+$/)
    .withMessage("First name must contain only alphabets"),

  check("lastName")
    .matches(/^[A-Za-z]+$/)
    .withMessage("Last name must contain only alphabets"),

  check("email")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),

  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at Least 8 characters Long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at Least one uppercase Latter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at Least onr lowercase latter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at Least one digit")
    .matches(/[!@#$%^&*]/)
    .withMessage("Password must contain at Least one special characters")
    .trim(),

  check("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password confirmation does not match password");
      }
      return true;
    }),

  check("userType")
    .notEmpty()
    .withMessage("Please select a user type")
    .isIn(["guest", "host"])
    .withMessage("Invalid user type selectd"),

  check("terms")
    .notEmpty()
    .withMessage("Please accept the terms and conditions")
    .custom((value, { req }) => {
      if (value !== "on") {
        throw new Error("Please accept the terms and conditions");
      }
      return true;
    }),

  (req, res, next) => {
    const { firstName, lastName, email, password, userType } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).render("Auth/SignUp", {
        pagetitle: "SignUp",
        currentPage: "/SignUp",
        isLoggedIn: false,
        errors: errors.array().map((error) => error.msg),
        oldInput: { firstName, lastName, email, password, userType },
         user: {},
      });
    }

    bcrypt
      .hash(password, 12)
      .then((hashedPassword) => {
        const user = new User({
          firstName,
          lastName,
          email,
          password: hashedPassword,
          userType,
        });
        return user.save();
      })
      .then(() => {
        res.redirect("/Login");
      })
      .catch((error) => {
        return res.status(422).render("Auth/SignUp", {
          pagetitle: "SignUp",
          currentPage: "/SignUp",
          isLoggedIn: false,
          errors: [error.message],
          oldInput: { firstName, lastName, email, password, userType },
           user: {},
        });
      });

    // const user = new User({
    //   firstName,
    //   lastName,
    //   email,
    //   password,
    //   userType,
    // });
    // user
    //   .save()
    //   .then(() => {
    //     res.redirect("/Login");
    //   })
    //   .catch((error) => {
    //     return res.status(422).render("Auth/SignUp", {
    //     pagetitle: "SignUp",
    //     currentPage: "/SignUp",
    //     isLoggedIn: false,
    //     errors: [error.message],
    //     oldInput: { firstName, lastName, email, password, userType },
    //   });
    //   });
  },
];

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(420).render("Auth/Login", {
      pagetitle: "Login",
      currentPage: "login",
      isLoggedIn: false,
      errors: ["User does not exist"],
      oldInput: { email },
       user: {},
    });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(422).render("Auth/Login", {
      pagetitle: "Login",
      currentPage: "login",
      isLoggedIn: false,
      errors: ["Incorrect password"],
      oldInput: { email },
      user: {},
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return rejects.status(422).render("Auth/Login", {
      pagetitle: "Login",
      currentPage: "Login",
      isLoggedIn: false,
      errors: ["Invelid Pasword"],
      oldInput: { email },
       user: {},
    });
  }

  req.session.isLoggedIn = true;
  req.session.user = user;
  req.session.save((err) => {
    if (err) {
      console.log("Session save error:", err);
    }
    res.redirect("/");
  });
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
