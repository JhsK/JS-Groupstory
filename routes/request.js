const express = require("express");
const { isLoggedIn, isNotLoggedIn, mainLoggedIn } = require("./middlewares");
const path = require("path");

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

router.get("/", isLoggedIn, (req, res) => {
  res.sendFile(path.join(__dirname, "../html/requestList.html"));
});

router.get("/regist", isLoggedIn, (req, res) => {
  res.sendFile(path.join(__dirname, "../html/requestForm.html"));
});

module.exports = router;
