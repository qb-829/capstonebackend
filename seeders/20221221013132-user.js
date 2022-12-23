'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
           await queryInterface.bulkInsert('Users', [{
        email: 'johndoe@email.com',
        username: 'tester',
        password: 'test password',
        createdAt: new Date(),
        updatedAt: new Date()
     }], {});
    
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('Users', null, {});
     
  }
};
