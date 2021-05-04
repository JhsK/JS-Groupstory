const express = require("express");
const { isLoggedIn, isNotLoggedIn, mainLoggedIn } = require("./middlewares");
const path = require("path");

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

router.get("/", mainLoggedIn, (req, res) => {
  res.sendFile(path.join(__dirname, "../html/main.html"));
});

router.get("/join", isNotLoggedIn, (req, res) => {
  res.sendFile(path.join(__dirname, "../html/join.html"));
});

module.exports = router;
