const express = require('express');
const router = express.Router();
const User = require('../models/User.model.js');
const Bike = require('../models/Bike.model');
const fileUpload = require('../configs/cloudinary.config')


// router.get("/bikes", (req, res, next) => {
//   Bike.find().then(allBikes => {
//     allBikes.forEach((b) => console.log(b));
//     res.render("bike", { bikes: allBikes })
//   }).catch(error => console.log(error))
// });

router.get("/bikes/:id", (req, res, next) => {

  Bike.findOne({ _id: req.params.id })
    .then(oneBike => {
      //console.log(oneBike)
      res.render("bike-detail", {
        unVelo: oneBike
      })

    })
    .catch(error => console.log(error))
})


router.get("/bike/create", (req, res, next) => {
  res.render("createabike", {})
})
router.post("/bike/create", fileUpload.single("picture"), (req, res, next) => {
  if (!req.session.currentUser) {
    return next(new Error('You must be logged to create a post'));
  }
  

  const { type, brand, location, status, size, description } = req.body
  const picture = req.file.path;
  Bike.create({
    user: req.session.currentUser._id,
    type,
    brand,
    location,
    status,
    size,
    description,
    picture
  })
    .then((bike) => {
      console.log("coucou", req.session.currentUser.id);
      res.redirect('/')
    })
    .catch(error => console.log(error))
})

//router.get('/user/:id',(req,res,next)=>)

module.exports = router