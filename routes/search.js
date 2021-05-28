const express = require("express");
const { isNotLoggedIn, mainLoggedIn, isLoggedIn } = require("./middlewares");
const path = require("path");
const Circle = require("../models/circle");

const router = express.Router();

router.get("/load", isLoggedIn, async (req, res, next) => {
  const requestUrl = req.headers.referer;
  const params = requestUrl.substring(29, requestUrl.length - 1);
  try {
    const searchLoad = await Circle.findAll({
      attributes: [
        "Circle_name",
        "Circle_vicerepcon",
        "Circle_repcon",
        "Circle_member",
        "Circle_info",
        "Circle_image",
        "Circle_recruit",
      ],
      where: {
        Circle_name: params,
      },
    });
    if (searchLoad) {
      return res.json(searchLoad);
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.get("/:id", isLoggedIn, (req, res) => {
  res.sendFile(path.join(__dirname, "../html/search.html"));
});

module.exports = router;
