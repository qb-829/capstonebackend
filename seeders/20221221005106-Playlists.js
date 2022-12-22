/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Playlists', [{
     artistName: 'Annie',
     songName: 'Easley', 
     genre: 'ajeasley@nasa.gov', 
     createdAt: new Date(), 
     updatedAt: new Date() 
    }], {}); 
    },
  

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('Playlists', null, {});
     
  return queryInterface.bulkDelete('Playlists', null, {});
  }
};
