'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
class Seniman extends Model{
}
Seniman.init({
  name: DataTypes.STRING,
    email: DataTypes.STRING,
    tag: DataTypes.STRING,
    isHired: DataTypes.INTEGER
}, { sequelize });

  Seniman.associate = function(models) {
    Seniman.belongsToMany(models.User, {through:models.SenimanUser})
  };
  return Seniman;
};