const express = require("express");
const { isNotLoggedIn, mainLoggedIn, isLoggedIn } = require("./middlewares");
const path = require("path");
const Circle = require("../models/circle");

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
      const mainLoad = await Circle.findAll({
        attributes: [
          "Circle_name",
          "Circle_vicerepcon",
          "Circle_repcon",
          "Circle_member",
          "Circle_info",
          "Circle_image",
        ],
        where: {
          Circle_name: params,
        },
      });

      if (mainLoad) {
        return res.json(mainLoad);
      }
    } else {
      const mainLoad = await Circle.findAll({
        attributes: [
          "Circle_name",
          "Circle_vicerepcon",
          "Circle_repcon",
          "Circle_member",
          "Circle_info",
          "Circle_image",
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
    const CircleDetailLoad = await Circle.findAll({
      attributes: [
        "Circle_name",
        "Circle_vicerepcon",
        "Circle_repcon",
        "Circle_member",
        "Circle_info",
        "Circle_image",
      ],
      where: {
        Circle_name: params,
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
