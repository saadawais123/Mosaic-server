'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userStanceAssociation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  userStanceAssociation.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      stanceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      associationType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'userStanceAssociation',
    },
  );

  return userStanceAssociation;
};
