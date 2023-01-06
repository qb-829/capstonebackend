const express = require("express");
const router = express.Router();

// const { Playlist } = require("../helpers/dbConnection.js");

// import db module
// const { User } = require('../helpers/dbConnection.js');
function requireAuth(req, res, next) {
  // some cool security logic code here
  if(req.session.user) next();
  // no user info then go to login
  else if(!req.session.user) {
      req.session.destroy();
      console.log("You're not logged in")
      return res.redirect('/login');
  }
  // not logged-in or any other reason
  else {
      req.session.destroy();
      console.log("You're not logged in")
      return res.redirect('/register');
  }
}

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now(), "playlist.js");
  next();
});

router.post("/users", requireAuth, async (req, res) => {
  // req.body contains an Object with firstName, lastName, email
  const { artistName, songName, genre } = req.body;
  const newPlaylist = await Playlist.create({
    artistName,
    songName,
    genre,
  });

  res.json({
    id: newPlaylist.id,
  });
});

router.get("/display", async (req, res) => {
  // const playlist = await Playlist.findAll();
  // res.json(playlist);
  console.log("I'm in /Display Route");
  res.send("I'm in /Display Route")
});

//Updating Existing User Playlist
router.post("/display/:id", async (req, res) => {
  const { id } = req.params;

  // Assuming that `req.body` is limited to
  // the keys firstName, lastName, and email
  const updatedPlaylist = await Playlist.update(req.body, {
    where: {
      id,
    },
  });

  res.json(updatedPlaylist);
});

module.exports = router;