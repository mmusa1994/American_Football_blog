const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

// INDEX ROUTE
router.get("/", (req, res) => {
  res.redirect("/blogs");
});

//Sign up

router.get("/register", (req, res) => {
  res.render("user/register");
});

//Handle register logic

router.post("/register", (req, res) => {
  const newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      return res.render("user/register");
    }
    passport.authenticate("local")(req, res, function() {
      res.redirect("/blogs");
    });
  });
});

//LOGIN routes

router.get("/login", (req, res) => {
  res.render("user/login");
});

//Login logic
//nested middleware

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/blogs",
    failureRedirect: "/login"
  }),
  (req, res) => {}
);

//Logout route
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/blogs");
});

module.exports = router;
