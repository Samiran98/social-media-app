'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_friend extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_friend.init({
    sourceId: { 
      type : DataTypes.INTEGER,
      allowNull: false
    },
    targetId: { 
      type : DataTypes.INTEGER,
      allowNull: false
    },
    type: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    notes: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user_friend',
  });
  return user_friend;
};