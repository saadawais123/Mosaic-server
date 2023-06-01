'use strict';
const { Model } = require('sequelize');
const interest = require('./interest');
const users = require('./users');
module.exports = (sequelize, DataTypes) => {
  class userFollower extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  userFollower.init(
    {
      followerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      followingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'userFollowers',
      // underscored:true
    },
  );

  return userFollower;
};
