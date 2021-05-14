const express = require("express");
const { isNotLoggedIn, mainLoggedIn, isLoggedIn } = require("./middlewares");
const path = require("path");
const Regist = require("../models/regist");

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

router.get("/circle/:id", isLoggedIn, (req, res) => {
  res.sendFile(path.join(__dirname, "../html/circleDetail.html"));
});

router.get("/", mainLoggedIn, (req, res) => {
  res.sendFile(path.join(__dirname, "../html/main.html"));
});

router.get("/email", isNotLoggedIn, (req, res) => {
  res.sendFile(path.join(__dirname, "../html/email.html"));
});

router.get("/join", isNotLoggedIn, (req, res) => {
  res.sendFile(path.join(__dirname, "../html/join.html"));
});

router.get("/main", isLoggedIn, async (req, res, next) => {
  try {
    const requestUrl = req.header.referer;
    if (requestUrl) {
      const params = requestUrl.substring(37, requestUrl.length);
      const mainLoad = await Regist.findAll({
        attributes: [
          "Regist_name",
          "Regist_vicerepcon",
          "Regist_repcon",
          "Regist_member",
          "Regist_info",
          "Regist_image",
        ],
        where: {
          Regist_name: params,
        },
      });

      if (mainLoad) {
        return res.json(mainLoad);
      }
    } else {
      const mainLoad = await Regist.findAll({
        attributes: [
          "Regist_name",
          "Regist_vicerepcon",
          "Regist_repcon",
          "Regist_member",
          "Regist_info",
          "Regist_image",
        ],
      });

      if (mainLoad) {
        return res.json(mainLoad);
      }
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.get("/circleLoad", isLoggedIn, async (req, res, next) => {
  const requestUrl = req.headers.referer;
  const params = requestUrl.substring(29, requestUrl.length);
  try {
    const CircleDetailLoad = await Regist.findAll({
      attributes: [
        "Regist_name",
        "Regist_vicerepcon",
        "Regist_repcon",
        "Regist_member",
        "Regist_info",
        "Regist_image",
      ],
      where: {
        Regist_name: params,
      },
    });
    if (CircleDetailLoad) {
      return res.json(CircleDetailLoad);
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

module.exports = router;
