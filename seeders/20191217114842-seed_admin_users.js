'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      name: 'Okka Linardi',
      email: 'okka@gmail.com',
      isLogin: 0,
      isAdmin: 1,
      password: '1030eb1b273e274252e7cdddfa71e6fd77c8b97d56e605ec108181962b9871bc', //admin
      secret: 234567898765434.1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Amalya Adyanissa',
      email: 'amalya@gmail.com',
      isLogin: 0,
      isAdmin: 1,
      password: '312ee787bee606200f4cccf96f53cfe01a1aee8a873f2dc24f51c454735643ae', //admin
      secret: 234567898765434.03,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
