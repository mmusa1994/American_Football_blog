const express = require("express");
const router = express.Router();

// INDEX ROUTE
router.get("/", (req, res) => {
  res.redirect("/blogs");
});

module.exports = router;
