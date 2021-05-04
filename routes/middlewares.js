const path = require("path");

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send("로그인 필요");
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    // const message = encodeURIComponent("로그인한 상태입니다");
    res.redirect("/");
  }
};

exports.mainLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.sendFile(path.join(__dirname, "../html/login.html"));
  }
};
