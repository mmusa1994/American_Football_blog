const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const passport = require("passport");
const LocalStrategy = require("passport-local");

const uri = "mongodb://localhost/blog_app";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
mongoose.connection.on("connected", () => {
  console.log("connected to DB");
});
// AP CONFIG
app.set("view engine", "ejs");

app.use("/assets", express.static("assets"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const User = require("./models/user");

//PASSPORT CONFIGURATION
app.use(
  require("express-session")({
    secret: "Tom Brady is  the best player",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//validation passing trough all routes
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

//ROUTES CONFIG

const blogRoutes = require("./routes/blog");
const indexRoutes = require("./routes/index");
const commentRoutes = require("./routes/comment");

app.use("/", indexRoutes);
app.use("/blogs", blogRoutes);
app.use("/blogs/:id/comments", commentRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("BlogApp is runing on 8080");
});
