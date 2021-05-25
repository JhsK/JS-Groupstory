const Sequelize = require("sequelize");

module.exports = class Regist extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        Circle_name: {
          type: Sequelize.STRING(30),
          allowNull: false,
          primaryKey: true,
        },
        Circle_member: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        Circle_info: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        Circle_image: {
          type: Sequelize.JSON,
          allowNull: false,
        },
        Circle_vicerepcon: {
          type: Sequelize.STRING(15),
          allowNull: false,
          unique: true,
        },
        Circle_repcon: {
          type: Sequelize.STRING(15),
          allowNull: false,
          unique: true,
        },
        Circle_recruit: {
          type: Sequelize.STRING(10),
          allowNull: false,
          defalutValue: "모집완료",
        },
        Circle_registrant: {
          type: Sequelize.STRING(30),
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Circle",
        tableName: "Circle",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {}
};
