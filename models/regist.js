const Sequelize = require("sequelize");

module.exports = class Regist extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        Regist_name: {
          type: Sequelize.STRING(30),
          allowNull: false,
          primaryKey: true,
        },
        Regist_member: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        Regist_info: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        Regist_image: {
          type: Sequelize.JSON,
          allowNull: true,
        },
        Regist_vicerepcon: {
          type: Sequelize.STRING(15),
          allowNull: false,
          unique: true,
        },
        Regist_repcon: {
          type: Sequelize.STRING(15),
          allowNull: false,
          unique: true,
        },
        Regist_enroll: {
          type: Sequelize.STRING(10),
          defalutValue: "검토중",
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Regist",
        tableName: "Regist",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {
    db.Regist.belongsTo(db.User, {
      foreignKey: "User_id",
      targetKey: "User_id",
    });
  }
};
