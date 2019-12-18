'use strict';
const hashPass = require('../helper/passwordHash')

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class User extends Model{
  }
  User.init({
    name: DataTypes.STRING,
    email: {type: DataTypes.STRING,
    validate: {isEmail:{msg:'Mohon untuk memasukan email dengan format yang sesuai'},
    isUnique(value){
      return User.findAll({where:{email : value}})
     .then(result=>{
       if(result.length > 0){
         throw new Error(`email ${value} sudah pernah digunakan`)
       }
     })
  }
}
},
    isLogin: DataTypes.INTEGER,
    isAdmin: DataTypes.INTEGER,
    password: DataTypes.STRING,
    secret: DataTypes.STRING
  }, {hooks:{
    beforeCreate: (instance, options)=>{
      console.log(instance)
      const secret = Math.random()+234567898765434
      instance.password = hashPass(instance.password, String(secret))
      instance.secret = String(secret)
      console.log(instance)
    }
  },sequelize });
  
  User.associate = function(models) {
    User.belongsToMany(models.Seniman, {through:models.SenimanUser})
  };
  return User;
};