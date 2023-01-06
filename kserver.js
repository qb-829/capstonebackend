const express = require ('express');
const Sequelize = require('sequelize');
const { Playlists } = require('../Display');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser')
const port = process.env.PORT || 3001;

module.exports = Playlists

router.use(express.json())
router.use(bodyParser.urlencoded({ extended: true}))
router.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
  next();
});
//so users have access only to public folder and not be able to see secret ones for hacking//
router.use(express.static('./public'));


const users =[]

router.get('/Display', (req, res) =>{
    res.json(users)
})

router.post('/Display', (req, res) => {
const {artistName, songName, genre} = req.body
 console.log(artistName, songName, genre);
 return res.send('Playlist Form')
});

app.listen(3001);