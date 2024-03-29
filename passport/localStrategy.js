const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const User = require("../models/user");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "User_id",
        passwordField: "User_pw",
      },
      async (User_id, User_pw, done) => {
        try {
          const exUser = await User.findOne({ where: { User_id } });
          if (exUser) {
            const result = await bcrypt.compare(User_pw, exUser.User_pw);
            if (result) {
              done(null, exUser);
            } else {
              done(null, false, { message: "비밀번호가 일치하지 않습니다." });
            }
          } else {
            done(null, false, { message: "가입되지 않은 회원입니다. " });
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
