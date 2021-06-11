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

    return res.json(searchLoad);
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.get("/:id", isLoggedIn, async (req, res) => {
  const requestUrl = req._parsedUrl.pathname;
  const params = requestUrl.substring(1, requestUrl.length);
  console.log(params);
  try {
    const searchBool = await Circle.findOne({ where: { Circle_name: params } });

    if (searchBool) {
      return res.sendFile(path.join(__dirname, "../html/search.html"));
    } else {
      return res.sendFile(path.join(__dirname, "../html/searchFalse.html"));
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

module.exports = router;
