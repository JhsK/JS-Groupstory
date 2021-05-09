const express = require("express");
const { isNotLoggedIn, mainLoggedIn, isLoggedIn } = require("./middlewares");
const path = require("path");
const Regist = require("../models/regist");

const router = express.Router();

router.get("/load", isLoggedIn, async (req, res, next) => {
  const requestUrl = req.headers.referer;
  const params = requestUrl.substring(29, requestUrl.length - 1);
  try {
    const searchLoad = await Regist.findAll({
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
