'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Users', [{
      name: "Super Admin",
      email: "super-admin@gmail.com",
      password: await bcrypt.hash("super-admin1234", 10),
      roleID: 1,
      active: true,
      verified: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: "Admin",
      email: "admin@gmail.com",
      password: await bcrypt.hash("admin1234", 10),
      roleID: 2,
      active: true,
      verified: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: "User",
      email: "user@gmail.com",
      password: await bcrypt.hash("user1234", 10),
      roleID: 3,
      active: true,
      verified: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Users', null, {})
  }
};
