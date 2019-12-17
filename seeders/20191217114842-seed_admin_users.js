'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      name: 'Okka Linardi',
      email: 'okka@gmail.com',
      isLogin: 0,
      isAdmin: 1,
      password: '12345',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Amalya Adyanissa',
      email: 'amalya@gmail.com',
      isLogin: 0,
      isAdmin: 1,
      password: '12345',
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
