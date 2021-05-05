const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];

const User = require("./user");
const Regist = require("./regist");

const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.User = User;
db.Regist = Regist;

User.init(sequelize);
Regist.init(sequelize);

User.associate(db);
Regist.associate(db);

module.exports = db;
