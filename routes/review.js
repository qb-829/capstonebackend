

const express = require('express');
const router = express.Router();

// import db module
const { User } = require('../helpers/dbConnection.js');


// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now(), 'review.js');
    next();
});

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

// Wildcard is causing issues
// router.get('*', (req, res) => {
//     req.session.destroy();
//     if(!req.session) console.log('Session destroyed');
//     return res.redirect(`login`);
// })


router.get('/review', requireAuth, async (req, res) => {
    
    const records = await User.findAll();
    let users = [];
    records.map((record) => { 
        users.push(record.dataValues) //records.dataValues
    })

    return res.render(`review`, {
        userName: req.session.user,
        userData: users, // passing properties (props) to review page
        title: 'Review',
        pageID: 'reviewPage',
        // async: true
    });
});


router.post('/review', (req, res) => {

    const{ name, review} = req.body;

    console.log(name, review);

    return res.send(`<h1>Thank you for signing up</h1>`)
});

module.exports = router