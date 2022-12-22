'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Playlist.init({
    artistName: DataTypes.STRING,
    songName: DataTypes.STRING,
    genre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Playlist',
  });
  return Playlist;
};

app.post('/users', async (req, res) => {
  // req.body contains an Object with firstName, lastName, email
  const { artistName, songName, genre } = req.body;
  const newPlaylist = await Playlist.create({
      artistName,
      songName,
      genre
  });
  
  
  res.json({
      id: newPlaylist.id
  });
})

app.get('/Display', async (req, res) => {
  const playlist = await Playlist.findAll();
  res.json(playlist);
});

//Updating Existing User Playlist
app.post('/Display/:id', async (req, res) => {
  const { id } = req.params;
  
  // Assuming that `req.body` is limited to
  // the keys firstName, lastName, and email
  const updatedPlaylist = await Playlist.update(req.body, {
    where: {
      id
    }
  });
  
  res.json(updatedPlaylist);
});