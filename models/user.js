"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Post);
      User.hasMany(models.Comment);
      User.hasMany(models.Like);
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Username required",
          },
          notNull: {
            msg: "Username required",
          },
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Name required",
          },
          notNull: {
            msg: "Name required",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
          notEmpty: {
            msg: "Email is required",
          },
          notNull: {
            msg: "Email is required",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password is required",
          },
          notNull: {
            msg: "Password is required",
          },
        },
      },
      dateofbirth: DataTypes.DATEONLY,
      profilepicture: {
        type: DataTypes.TEXT,
        defaultValue: "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg",
        allowNull: false,
      },
    },
    {
      hooks: {
        beforeCreate(user, option) {
          user.password = hashPassword(user.password, 8);
        },
        beforeUpdate(user, option) {
          user.password = hashPassword(user.password, 8);
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
