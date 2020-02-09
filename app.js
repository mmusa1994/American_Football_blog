const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

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
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const Blog = require("./models/blog");

const blogRoutes = require("./routes/blog");
const indexRoutes = require("./routes/index");

app.use("/", indexRoutes);
app.use("/blogs", blogRoutes);

app.listen(5000, () => {
  console.log("BlogApp is runing on 5000");
});
