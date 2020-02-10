const express = require("express");
const router = express.Router({ mergeParams: true });
const Blog = require("../models/blog");
const Comment = require("../models/comment");
const middleware = require("../middleware");

//Comments new

router.get("/new", middleware.isLoggedIn, (req, res) => {
  Blog.findById(req.params.id, (err, blog) => {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", { blog: blog });
    }
  });
});

//Comments create

router.post("/", middleware.isLoggedIn, (req, res) => {
  Blog.findById(req.params.id, (err, blog) => {
    if (err) {
      console.log(err);
      res.redirect("/blogs");
    } else {
      Comment.create(req.body.comment, (err, comment) => {
        if (err) {
          console.log(err);
        } else {
          blog.comments.push(comment);
          blog.save();
          res.redirect("/blogs/" + blog._id);
        }
      });
    }
  });
});

module.exports = router;
