
const express = require('express');
const router = express.Router();

// encryption
const bcrypt = require('bcrypt'); //used to encrypt passwords

// import db module
const { User } = require('../helpers/dbConnection.js');


// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now(), 'authentication.js');
    next();
});


router.get('/register', (req, res) => {
    
    return res.render(`register`, {
        title: 'Register',
        pageID: 'registerPage'
    });
});

router.post('/register', async (req, res) => {

    try {
        const { email, username, password } = req.body;
        // The order of the variables DOES matter
        // console.log(password);

        const records = await User.findAll({where: {email: email}});
        // console.log(records.length);
        if(records.length === 0) {

            //encrypt the password
            bcrypt.hash(password, 10, async (error, hash) => {
                // add to database
                if(error) {
                    console.log(`error with the hash: ${error}`);
                    return res.redirect('register');
                }
                else {
                    const newUser = await User.create({
                        email: email, 
                        username: username, 
                        password: hash
                    });
                    // console.log(newUser);
                }
            })

            // on success go to login page
            return res.redirect(`login`);
        }
        else {
            //email was found in our db, return an error
            console.log('Email already exists');

            // return res.status(422).send({error: 'Email already exits'})
            return res.status(422).send(`<h2>Email already exits: ${error}</h2>`)
        }


    } catch (error) {
        // return res.status(422).send({error: 'Email already exits'})
        return res.status(422).send(`<h2>Ooops! An error happend: ${error}</h2>`)
    }
    
});


router.get('/login', (req, res) => {
    
    return res.render(`login`, {
        title: 'Login',
        pageID: 'loginPage'
    });
});


router.post('/LoginForm', async (req, res) => {
    
    try {
        const{ username, password} = req.body;
        // console.log('password', password);
        const records = await User.findAll({where: {username: username}});
        // console.log('db password', records[0].dataValues.password);

        if(records !== null) {

            try {
                const isMatch = await bcrypt.compare(password, records[0].password)
                if(isMatch) {
                    // assign the username to create the session
                    req.session.user = username
                    // console.log(req.session.user)
                    return res.redirect('review');
                    // return res.send('finally worked');
                }
                else if(!isMatch) {
                    // Passwords don't match, back to login
                    console.log(`Passwords don't match`);
                    return res.redirect('login');
                }
            } catch (error) {
                //no user found, go to register, can't access db, etc
                console.log(`No records found for user: ${username}`);
                    return res.redirect('register');
            }
        }

    } catch (error) {
        console.log('Error Accessing the DB!');
        return res.render('/login')
    }
});


router.get('/logout', (req, res) => {
    req.session.destroy();
    if(!req.session) console.log('Session destroyed');
    return res.redirect(`login`);
});

module.exports = router