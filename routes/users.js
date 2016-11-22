'use strict';

const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  console.log("User Profile");
  res.render('user');
});


module.exports = router;
