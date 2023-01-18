/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Playlists",
      [
        {
          artistName: "Michael Jackson",
          songName: "Thriller",
          genre: "pop",
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          artistName: "Michael Jackson",
          songName: "Thriller",
          genre: "pop",
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Playlists", null, {});

    // return queryInterface.bulkDelete('Playlists', null, {});
  },
};