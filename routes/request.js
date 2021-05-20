const express = require("express");
const multer = require("multer");
const { isLoggedIn } = require("./middlewares");
const path = require("path");
const fs = require("fs");
const Regist = require("../models/regist");

const router = express.Router();

try {
  fs.readdirSync("uploads");
} catch (error) {
  console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
  fs.mkdirSync("uploads");
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "uploads/");
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

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
  if (res.locals.user.dataValues.User_power) {
    res.sendFile(path.join(__dirname, "../html/requestDetail.html"));
  } else {
    res.redirect("/");
  }
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
        "Regist_image",
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

      await Regist.destroy({
        where: { Regist_enroll: "검토완료" },
      });
    }
    return res.redirect("/request");
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

module.exports = router;
