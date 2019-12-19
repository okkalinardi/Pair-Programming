'use strict';
module.exports = (sequelize, DataTypes) => {

  const Model = sequelize.Sequelize.Model
  class SenimanUser extends Model{
  }
  SenimanUser.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    UserId: DataTypes.INTEGER,
    SenimanId: DataTypes.INTEGER,
    projectStatus: DataTypes.INTEGER,
    projectName: DataTypes.STRING
  }, { sequelize });
  
  SenimanUser.associate = function(models) {
    SenimanUser.belongsTo(models.User),
    SenimanUser.belongsTo(models.Seniman)
  };
  return SenimanUser;
};