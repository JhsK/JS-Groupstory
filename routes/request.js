const express = require("express");
const multer = require("multer");
const { isLoggedIn } = require("./middlewares");
const path = require("path");
const fs = require("fs");
const Regist = require("../models/regist");

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

router.get("/list", isLoggedIn, async (req, res, next) => {
  try {
    const RegistList = await Regist.findAll({
      attributes: ["Regist_name", "User_id", "Regist_enroll"],
    });
    if (RegistList) {
      return res.json(RegistList);
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.get("/detail/:id", isLoggedIn, (req, res) => {
  res.sendFile(path.join(__dirname, "../html/requestDetail.html"));
});

router.get("/load", isLoggedIn, async (req, res, next) => {
  const requestUrl = req.headers.referer;
  const params = requestUrl.substring(37, requestUrl.length);
  try {
    const RegistLoad = await Regist.findAll({
      attributes: [
        "Regist_name",
        "Regist_vicerepcon",
        "Regist_repcon",
        "Regist_member",
        "Regist_info",
      ],
      where: {
        Regist_name: params,
      },
    });
    if (RegistLoad) {
      return res.json(RegistLoad);
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post("/state", isLoggedIn, async (req, res, next) => {
  const { Regist_enroll } = req.body;
  const requestUrl = req.headers.referer;
  const params = requestUrl.substring(37, requestUrl.length);
  try {
    const exRegist = await Regist.findOne({ where: { Regist_name: params } });
    if (exRegist) {
      await Regist.update(
        {
          Regist_enroll,
        },
        {
          where: {
            Regist_name: params,
          },
        }
      );
    }
    return res.redirect("/request");
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

module.exports = router;
