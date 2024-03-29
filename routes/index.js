const express = require("express");
const { isNotLoggedIn, mainLoggedIn, isLoggedIn } = require("./middlewares");
const path = require("path");
const Circle = require("../models/circle");

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

router.get("/circle/:id", isLoggedIn, async (req, res) => {
  try {
    const requestParams = req.params.id;
    const exWrite = await Circle.findOne({
      attributes: ["Circle_registrant"],
      where: {
        Circle_name: requestParams,
      },
    });

    const writer = JSON.parse(JSON.stringify(exWrite)).Circle_registrant;

    if (res.locals.user.dataValues.User_id === writer) {
      res.render("circleDetail", { updateAuth: true });
    } else {
      res.render("circleDetail", { updateAuth: false });
    }

    // console.log(res.locals.user.dataValues.User_id);
    // res.sendFile(path.join(__dirname, "../html/circleDetail.html"));
  } catch (error) {
    console.error(error);
    return next(error);
  }
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
          "Circle_recruit",
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
          "Circle_recruit",
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
  let params = requestUrl.substring(29, requestUrl.length);
  let paramDecoded;

  if (params.indexOf("%") >= 0) {
    paramDecoded = decodeURIComponent(params);
    params = paramDecoded;
  }
  try {
    const CircleDetailLoad = await Circle.findAll({
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
    if (CircleDetailLoad) {
      return res.json(CircleDetailLoad);
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post("/recruitUpdate", isLoggedIn, async (req, res, next) => {
  const { Circle_recruit } = req.body;
  const requestUrl = req.headers.referer;
  const params = requestUrl.substring(29, requestUrl.length);

  try {
    if (Circle_recruit) {
      await Circle.update(
        {
          Circle_recruit,
        },
        {
          where: {
            Circle_name: params,
          },
        }
      );
    }
    return res.redirect(requestUrl);
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

module.exports = router;
