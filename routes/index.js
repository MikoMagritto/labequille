const express = require('express');
const router = express.Router();
const Bike = require("../models/Bike.model.js")

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get("/bikes", (req, res, next) => {
  Bike.find().then(allBikes => {
    allBikes.forEach((b) => console.log(b));
    res.render("bike", { bikes: allBikes })
  }).catch(error => console.log(error))
});

router.get("/bikes/:id", (req, res, next) => {

  Bike.findOne({ _id: req.params.id })
    .then(oneBike => {
      console.log(oneBike)
      res.render("bike-detail", {
        unVelo: oneBike
      })

    })
    .catch(error => console.log(error))
})

router.get("/bike/create", (req, res, next) => {
  res.render("bike-create", {})
})
router.post("/bike/create", (req, res, next) => {
  const { title, brand, location, status, size, description, picture } = req.body

  Bike.create({ title, brand, status, description, picture })
    .then(() => res.redirect('/bikes'))
    .catch(error => console.log(error))
})




module.exports = router;
