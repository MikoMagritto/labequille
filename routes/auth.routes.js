const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const routeGuard = require('../configs/route-guard.config')


const User = require('../models/User.model.js');

const Bike = require('../models/Bike.model')

router.get('/signup', (req, res) => res.render('signup'));

router.post('/signup', (req, res, next) => {
    const { prenom, nom, pseudo, mail, telephone, location, password } = req.body;
    if (!prenom || !password) {
        res.render('signup', { errorMessage: 'All fields are mandatory. Please provide your username, email and password.' });
        return;
    }
    bcryptjs
        .genSalt(10)
        .then(salt => bcryptjs.hash(password, salt))
        .then(hashedPassword => {
            return User.create({
                // username: username
                prenom,
                nom,
                pseudo,
                mail,
                telephone,
                location,
                // passwordHash => this is the key from the User model
                //     ^
                //     |            |--> this is placeholder (how we named returning value from the previous method (.hash()))
                password: hashedPassword,
                //imageUrl: req.file.path
            });
        })
        .then(userFromDB => {
            console.log('Newly created user is: ', userFromDB);
            res.redirect('/');
        })
        .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
                res.status(500).render('signup', { errorMessage: error.message });
            } else if (error.code === 11000) {
                res.status(500).render('signup', {
                    errorMessage: 'Username and email need to be unique. Either username or email is already used.'
                });
            } else {
                next(error);
            }
        });
});


router.get('/login', (req, res, next) => {
    res.render('login')
});

router.post('/login', (req, res, next) => {
    const { mail, password } = req.body;
    if (mail === '' || password === '') {
        res.render('login', {
            errorMessage: 'Please enter both, email and password to login.'
        });
        return;
    }
    User.findOne({ mail })
        .then(user => {
            if (!user) {
                res.render('login', { errorMessage: 'Email is not registered. Try with other email.' });
                return;
            } else if (bcryptjs.compareSync(password, user.password)) {
                console.log(user.password)
                req.session.currentUser = user;
                res.redirect('/');
            } else {
                res.render('login', { errorMessage: 'Incorrect password.' });
            }
        })
        .catch(error => next(error));
});

/**User.findOne({ email })
    .then(user => {
      if (!user) {
        res.render('auth/login', { errorMessage: 'Email is not registered. Try with other email.' });
        return;
      } else if (bcryptjs.compareSync(password, user.passwordHash)) {
        req.session.currentUser = user;
        res.redirect('/userProfile');
      } else {
        res.render('auth/login', { errorMessage: 'Incorrect password.' });
      }
    })
    .catch(error => next(error));
}); */

router.post('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

router.get('/profil', routeGuard, (req, res, next) => {
    Bike.find({ user: req.session.currentUser._id })
        .then((bikes) => {
            console.log("coucou", bikes)
            res.render('userProfile', { user: req.session.currentUser, bikes })
        })
        .catch(err => next(err))
    // console.log("coucou", user.velos)
    // res.render('userProfile')
})

// router.get('/private', (req, res, next) => {
//     if (!req.session.currentUser) {
//         res.redirect('/main')

//     }
//     res.render('private', { user: req.session.currentUser })
// })

// router.get('/main', (req, res, next) => {
//     res.render('main')
// })

module.exports = router;