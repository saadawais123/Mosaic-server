'use strict';
const { Model } = require('sequelize');
const interest = require('./interest');
const user = require('./users');
module.exports = (sequelize, DataTypes) => {
  class stance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  stance.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      videoUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      interestId: {
        type: DataTypes.INTEGER,
        // allowNull: false,
      },
      shares: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      dislikes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      reposts: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'stance',
      // underscored:true
    },
  );
  stance.associate = function (models) {
    stance.hasOne(models.users, { foreignKey: 'userId' });
    stance.belongsTo(models.interest, { foreignKey: 'interestId' }); // Stance belongs to an Interest
  };

  return stance;
};
