const express = require("express");
const router = express.Router();

const { db } = require("../helpers/dbConnection.js");

// import db module
// const { User } = require('../helpers/dbConnection.js');
function requireAuth(req, res, next) {
  // some cool security logic code here
  if (req.session.user) next();
  // no user info then go to login
  else if (!req.session.user) {
    req.session.destroy();
    console.log("You're not logged in1");
    return res.redirect("/login");
  }
  // not logged-in or any other reason
  else {
    req.session.destroy();
    console.log("You're not logged in2");
    return res.redirect("/register");
  }
}

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now(), "playlist.js");
  next();
});

router.post("/create", async (req, res) => {
  // router.post("/create", requireAuth, async (req, res) => {
  // req.body contains an Object with firstName, lastName, email
  console.log("create hit");

  try {
    const { artistName, songName, genre } = req.body;

    const newPlaylist = await db.Playlist.create({
      artistName,
      songName,
      genre,
    });

    console.log(newPlaylist);

    res.send("I'm in /create Route");
    res.json({
      id: newPlaylist.id,
    });
  } catch (error) {}
});

router.get("/myplaylist", async (req, res) => {
  // const playlist = await db.Playlist.findAll();
  // res.json(playlist);
  console.log("I'm in /MyPlaylist Route");

  const records = await db.Playlist.findAll(req.body);
  // console.log(records.length);

  console.log(records);

  // res.send("I'm in /MyPlaylist Route");
  return res.json({records });
 
});

//Updating Existing User Playlist
router.post("/myplaylist/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  // Assuming that `req.body` is limited to
  // the keys firstName, lastName, and email
  const updatedPlaylist = await db.Playlist.update(req.body, {
    where: {
      id,
    },
  });

  res.json(updatedPlaylist);
});

module.exports = router;
