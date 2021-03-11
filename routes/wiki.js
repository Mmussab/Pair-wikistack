const express = require("express");
const router = express.Router();
const addPage = require("../views/addPage");

router.get("/", (req, res, next) => {
  res.send("Home page");
});
router.post("/", (req, res, next) => {
  res.send("posted");
});
router.get("/add", (req, res, next) => {
  res.send(addPage());
});

module.exports = router;
