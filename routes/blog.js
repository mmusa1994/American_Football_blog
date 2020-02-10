const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");

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
router.get("/new", (req, res) => {
  res.render("new");
});
//CREATE ROUTE
router.post("/", (req, res) => {
  Blog.create(req.body.blog, (err, newBlog) => {
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
router.get("/:id/edit", (req, res) => {
  Blog.findById(req.params.id, (err, blogFound) => {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.render("blog/edit", { blog: blogFound });
    }
  });
});
// UPDATE ROUTES
router.put("/:id", (req, res) => {
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updateBlog) => {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.redirect("/blogs/" + req.params.id);
    }
  });
});
//DELETE ROUTE
router.delete("/:id", (req, res) => {
  Blog.findByIdAndRemove(req.params.id, req.body.blog, (err, updateBlog) => {
    if (err) {
      res.redirect("/blogs" + req.params.id);
    } else {
      res.redirect("/blogs");
    }
  });
});

module.exports = router;
