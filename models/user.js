'use strict';
const hashPass = require('../helper/bcryptHash')

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
      return hashPass(instance.password)
      .then(newPass=>{
        // console.log(newPass)
        instance.password = newPass
      })
      .catch(err=>{
        res.send(err)
      })
    }
  },sequelize });
  
  User.associate = function(models) {
    User.belongsToMany(models.Seniman, {through:models.SenimanUser})
  };
  return User;
};