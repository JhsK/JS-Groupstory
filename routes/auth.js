const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const multer = require("multer");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const User = require("../models/user");
const Regist = require("../models/regist");
const path = require("path");
const fs = require("fs");

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

router.post("/join", isNotLoggedIn, async (req, res, next) => {
  const { User_name, User_id, User_pw, User_dept } = req.body;
  try {
    const exUser = await User.findOne({ where: { User_id } });
    if (exUser) {
      return res.redirect("/join?error=exist");
    }
    const hash = await bcrypt.hash(User_pw, 12);
    await User.create({
      User_name,
      User_id,
      User_dept,
      User_pw: hash,
    });
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post("/login", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.redirect(`/?loginError=${info.message}`);
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
      }
      return res.redirect("/");
    });
  })(req, res, next);
});

router.get("/logout", isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("/");
});

router.post("/img", isLoggedIn, upload.single("img"), (req, res) => {
  console.log(req.file);
  res.json({ url: `/img/${req.file.filename}` });
});

const upload2 = multer();
router.post("/request", isLoggedIn, upload2.none(), async (req, res, next) => {
  const {
    Regist_name,
    Regist_vicerepcon,
    Regist_repcon,
    Regist_member,
    Regist_info,
  } = req.body;
  console.log(req.body.url);
  const fk = req.user.dataValues.User_id;
  try {
    const exRegist = await Regist.findOne({ where: { Regist_name } });
    if (exRegist) {
      return res.redirect("/request?error=exist");
    }
    await Regist.create({
      Regist_name,
      Regist_vicerepcon,
      Regist_repcon,
      Regist_member,
      Regist_info,
      Regist_enroll: "검토중",
      User_id: fk,
      Regist_image: req.body.url,
    });
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

module.exports = router;
