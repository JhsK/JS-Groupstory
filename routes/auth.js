const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const multer = require("multer");
const nodemailer = require("nodemailer");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const User = require("../models/user");
const Regist = require("../models/regist");
const path = require("path");
const fs = require("fs");

const router = express.Router();
let authNum; // 이메일 인증번호
let requestEmail; // 사용자 이메일 임시 저장소

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

router.post("/email", isNotLoggedIn, async (req, res, next) => {
  authNum = Math.random().toString().substr(2, 6);
  requestEmail = req.body.email + "@bu.ac.kr";

  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  let mailOptions = await transporter.sendMail({
    from: `곰방`,
    to: requestEmail,
    subject: "[데베삼겹살] 회원가입을 위한 인증번호를 입력해주세요",
    html: `<h1>이메일 인증을 위해 하단의 번호를 입력해주세요</h1><br /><h3>${authNum}</h3>`,
  });

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    }
    console.log("Finish sending email : " + info.response);
    transporter.close();
    res.status(200);
  });
});

router.post("/authNum", isNotLoggedIn, async (req, res) => {
  if (authNum === req.body.reqAuthNum) {
    res.redirect("/join");
  } else {
    res.redirect("/authNum?error=번호가 일치하지 않습니다.");
  }
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
      User_power: 0,
      User_email: requestEmail,
    });
    authNum = undefined;
    requestEmail = undefined;
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
