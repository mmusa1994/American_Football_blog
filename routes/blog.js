const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");
const middleware = require("../middleware");

router.get("/", (req, res) => {
  Blog.find((err, blogs) => {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { blogs: blogs });
    }
  });
});
// NEW ROUTE
router.get("/new", middleware.isLoggedIn, (req, res) => {
  res.render("blog/new");
});
//CREATE ROUTE
router.post("/", middleware.isLoggedIn, (req, res) => {
  console.log(req.body.blog);
  console.log(req.body.title);
  const title = req.body.title;
  const image = req.body.image;
  const dsc = req.body.body;
  const author = {
    id: req.user._id,
    username: req.user.username
  };
  const newBlog = {
    title: title,
    image: image,
    body: dsc,
    author: author
  };
  Blog.create(newBlog, (err, newBlogcreated) => {
    if (err) {
      res.render("blog/new");
    } else {
      res.redirect("/blogs");
    }
  });
});
// SHOW ROUTE
router.get("/:id", (req, res) => {
  Blog.findById(req.params.id)
    .populate("comments")
    .exec((err, foundBlog) => {
      if (err) {
        console.log(err);
      } else {
        res.render("blog/show", { blog: foundBlog });
      }
    });
});
//EDIT ROUTES
router.get("/:id/edit", middleware.checkBlogOwnership, (req, res) => {
  Blog.findById(req.params.id, (err, blogFound) => {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.render("blog/edit", { blog: blogFound });
    }
  });
});
// UPDATE ROUTES
router.put("/:id", middleware.checkBlogOwnership, (req, res) => {
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updateBlog) => {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.redirect("/blogs/" + req.params.id);
    }
  });
});
//DELETE ROUTE
router.delete("/:id", middleware.checkBlogOwnership, (req, res) => {
  Blog.findByIdAndRemove(req.params.id, req.body.blog, (err, updateBlog) => {
    if (err) {
      res.redirect("/blogs" + req.params.id);
    } else {
      res.redirect("/blogs");
    }
  });
});

module.exports = router;
