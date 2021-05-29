const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');


const User = require('../models/User.model.js');

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


/**uter.post('/signup', uploader.single('image'), (req, res, next) => {
const { username, email, password } = req.body;




if (!username || !email || !password) {
  res.render('auth/signup', { errorMessage: 'All fields are mandatory. Please provide your username, email and password.' });
  return;
}

// make sure passwords are strong:
const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
if (!regex.test(password)) {
  res
    .status(500)
    .render('auth/signup', { errorMessage: 'Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.' });
  return;
}

bcryptjs
  .genSalt(saltRounds)
  .then(salt => bcryptjs.hash(password, salt))
  .then(hashedPassword => {
    return User.create({
      // username: username
      username,
      email,
      // passwordHash => this is the key from the User model
      //     ^
      //     |            |--> this is placeholder (how we named returning value from the previous method (.hash()))
      passwordHash: hashedPassword,
      imageUrl: req.file.path
    });
  })
  .then(userFromDB => {
    console.log('Newly created user is: ', userFromDB);
    res.redirect('/userProfile');
  })
  .catch(error => {
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(500).render('auth/signup', { errorMessage: error.message });
    } else if (error.code === 11000) {
      res.status(500).render('auth/signup', {
        errorMessage: 'Username and email need to be unique. Either username or email is already used.'
      });
    } else {
      next(error);
    }
  }); // close .catch()
}) */


router.get('/login', (req, res,next) =>{ 
res.render('auth/login')});

router.post('/login',(req,res,next)=>{
  const {username,password}=req.body;
  if(!username || !password){
   res.render('auth/login',{errorMessage:'Merci de remplir les deux champs'})
  }
  User.findOne({username:username})
  .then((userFromDb)=>{
      if (!userFromDb){

          res.render('auth/login',{errorMessage:`l'utilisateur non trouvé` })
          return;
      } else { 
      if (bcryptjs.compareSync(password, userFromDb.passwordHash)){
          req.session.currentUser=userFromDb
        res.redirect('/profil')
      }else{
          res.render('auth/login',{errorMessage:'mauvais mot de passe'})
      }
      }
  })
  .catch(err=>{console.log('oops not found this user')})
})

router.get('/profil',(req,res,next)=>{
  res.render('auth/profil',{user:req.session.currentUser})
})

router.get('/private',(req,res,next)=>{
  if(!req.session.currentUser){
      res.redirect('/main')

  }
  res.render('private',{user:req.session.currentUser})
})

router.get('/main',(req,res,next)=>{
  res.render('main')
})

module.exports = router;