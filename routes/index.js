const express = require('express');
const router = express.Router();
const Bike = require("../models/Bike.model.js")

/* GET home page */
router.get('/', (req, res, next) => {
  Bike.find().then(allBikes => {
    // allBikes.forEach((b) => console.log(b));
    res.render("index", { bikes: allBikes })
  }).catch(error => console.log(error))
});
module.exports = router;
