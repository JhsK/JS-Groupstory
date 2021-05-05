const passport = require("passport");
const local = require("./localStrategy");
const User = require("../models/user");

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.User_id);
    console.log(user.User_id);
  });

  passport.deserializeUser((User_id, done) => {
    User.findOne({ where: { User_id } })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });

  local();
};
