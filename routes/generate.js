'use strict';

const express = require('express');
const router = express.Router();

/* GET new_image listing. */
router.get('/new_image', function(req, res, next) {
  res.render('generate', {title: "Face App"});
});

module.exports = router;
