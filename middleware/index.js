const Blog = require("../models/blog");
const Comment = require("../models/comment");

const middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

middlewareObj.checkBlogOwnership = function(req, res, next) {
  if (req.isAuthenticated()) {
    Blog.findById(req.params.id, (err, foundIdBlog) => {
      if (err) {
        console.log(err);
        res.redirect("back");
      } else {
        if (foundIdBlog.author.id.equals(req.user._id)) {
          next();
        } else {
          res.redirect("back");
        }
      }
    });
  } else {
    res.redirect("back");
  }
};

module.exports = middlewareObj;
