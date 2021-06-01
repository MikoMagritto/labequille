const express = require('express');
const router = express.Router();
const Bike = require("../models/Bike.model.js")

/* GET home page */
router.get('/', (req, res, next) => {
  console.log("yo");
  res.render('index',
    //{ user: req.session.currentUser }
  )
});


module.exports = router;
