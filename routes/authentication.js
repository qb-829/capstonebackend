
const express = require('express');
const router = express.Router();

// encryption
const bcrypt = require('bcrypt'); //used to encrypt passwords

// import db module
const { db } = require('../helpers/dbConnection.js');

// console.log('USER',db);


// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now(), 'authentication.js');
    next();
});


// router.get('/register', (req, res) => {
    
//     return res.render(`register`, {
//         title: 'Register',
//         pageID: 'registerPage'
//     });
// });

router.post('/register', async (req, res) => {
    console.log('register route')
    console.log(req.body);
    try {
        const { email, username, password } = req.body;
        console.log('email', email)
        // The order of the variables DOES matter
        // console.log(password);

        console.log("I'm in register");

        const records = await db.User.findAll({where: {email: email}});
        // console.log(records.length);
        if(records.length === 0) {

            //encrypt the password
            bcrypt.hash(password, 10, async (error, hash) => {
                // add to database
                if(error) {
                    console.log(`error with the hash: ${error}`);
                    console.log(records)
                    return res.send('something went wrong')
                    // return res.json(records);
                }
                else {
                    const newUser = await db.User.create({
                        email: email, 
                        username: username, 
                        password: hash
                    });
                    console.log(newUser);
                    return res.json(newUser);
                }
            })

            // on success go to login page
            // return res.redirect(`login`);
            // return res.json(records);
        }
        else {
            //email was found in our db, return an error
            console.log('Email already exists');

            // return res.status(422).send({error: 'Email already exits'})
            return res.status(422).send(`<h2>Email already exits</h2>`)
        }

    } catch (error) {
        // return res.status(422).send({error: 'Email already exits'})
        return res.status(422).send(`<h2>Ooops! An error happend: ${error}</h2>`)
    }
    
});


// router.get('/login', (req, res) => {
    
//     return res.render(`login`, {
//         title: 'Login',
//         pageID: 'loginPage'
//     });
// });


router.post('/login', async (req, res) => {
    
    try {
        const{ username, password} = req.body;
        // console.log('password', password);
        const records = await db.User.findAll({where: {username: username}});
        // console.log('db password', records[0].dataValues.password);

        if(records !== null) {
            console.log("In login - there's a record");

            try {
                const isMatch = await bcrypt.compare(password, records[0].password);
                // let isMatch = false;
                // if(password === records[0].password) isMatch = true
                if(isMatch) {
                    // assign the username to create the session
                    req.session.user = username
                    // console.log(req.session.user)
                    // return res.redirect('review');
                    // return res.send('finally worked');
                    return res.json(records);
                }
                else if(!isMatch) {
                    // Passwords don't match, back to login
                    console.log(`Passwords don't match`);
                    // return res.redirect('login');
                    return res.send('error with password');
                }
            } catch (error) {
                //no user found, go to register, can't access db, etc
                console.log(`No records found for user: ${username}`);
                    // return res.redirect('register');
                    return res.send('error with password');
            }
        }

    } catch (error) {
        console.log('Error Accessing the DB!');
        return res.render('/login')
    }
});


router.post('/logout', (req, res) => {
    req.session.destroy();
    if(!req.session) console.log('Session destroyed');
    // return res.redirect(`login`);
});

module.exports = router