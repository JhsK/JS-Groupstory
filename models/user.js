const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        User_id: {
          type: Sequelize.STRING(30),
          allowNull: false,
          primaryKey: true,
        },
        User_name: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        User_pw: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        User_email: {
          type: Sequelize.STRING(40),
          unique: true,
          // allowNull: false,
          allowNull: true,
        },
        User_power: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: 0,
        },
        User_dept: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "User",
        tableName: "User",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {
    db.User.hasOne(db.Regist, { foreignKey: "User_id", sourceKey: "User_id" });
  }
};
