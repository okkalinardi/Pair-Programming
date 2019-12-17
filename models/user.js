'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class User extends Model{
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    isLogin: DataTypes.INTEGER,
    isAdmin: DataTypes.INTEGER,
    password: DataTypes.STRING
  }, { sequelize });
  
  User.associate = function(models) {
    User.belongsToMany(models.Seniman, {through:models.SenimanUser})
  };
  return User;
};