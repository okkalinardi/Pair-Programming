'use strict';
const arr = [
  {
    name: 'Budi Utomo',
    email: 'budi@gmail.com',
    tag: 'fotografi',
    isHired: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    slot: 4
  },
  {
    name: 'Bayu Oktari',
    email: 'bayu@gmail.com',
    tag: 'Mural',
    isHired: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    slot: 5
  },
  {
    name: 'Nadia Utami',
    email: 'nadia@gmail.com',
    tag: 'fotografi',
    isHired: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    slot: 3
  },
  {
    name: 'Kiara Knightley',
    email: 'kiara@gmail.com',
    tag: 'Mural',
    isHired: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    slot: 7
  },
  {
    name: 'Butet Nugroho',
    email: 'butet@gmail.com',
    tag: 'fotografi',
    isHired: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    slot: 6
  }
]
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Senimans', arr, {});
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
    return queryInterface.bulkDelete('Senimans', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
