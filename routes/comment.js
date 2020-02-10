const express = require("express");
const router = express.Router({ mergeParams: true });
const Blog = require("../models/blog");
const Comment = require("../models/comment");

//Comments new

router.get("/new", (req, res) => {
  Blog.findById(req.params.id, (err, blog) => {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", { blog: blog });
    }
  });
});

//Comments create

router.post("/", (req, res) => {
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

// Comment edit route
// router.get("/:comment_id/edit", (req, res) => {
//   Comment.findById(req.params.comment_id, (err, foundComment) => {
//     if (err) {
//       res.redirect("back");
//     } else
//       res.render("comments/edit", {
//         blogs_id: req.params.id,
//         comment: foundComment
//       });
//   });
// });
// handle comment logic
// router.put("/:comment_id/", (req, res) => {
//   Comment.findByIdAndUpdate(
//     req.params.comment_id,
//     req.body.comment,
//     (err, updatedComment) => {
//       if (err) {
//         res.redirect("back");
//       } else {
//         res.redirect("/blogs/" + req.params.id);
//       }
//     }
//   );
// });

// Deleting Comment route
// router.delete("/:comment_id", (req, res) => {
//   Comment.findByIdAndRemove(req.params.comment_id, err => {
//     if (err) {
//       res.redirect("back");
//     } else {
//       //   req.flash("success", "Succssesfuly deleted comment");
//       res.redirect("/blogs/" + req.params.id);
//     }
//   });
// });

module.exports = router;
