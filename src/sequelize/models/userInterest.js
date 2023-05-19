'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userInterests extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  userInterests.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      interestId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'userInterests',
    },
  );

  return userInterests;
};
