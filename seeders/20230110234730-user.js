"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "johnsnow@gmail.com",
          username: "js101",
          password: "pwd1",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: "johndoe@gmail.com",
          username: "jd101",
          password: "pwd2",
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete("Users", null, {});

  },
};









