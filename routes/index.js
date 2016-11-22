'use strict';

const express = require('express');
const router = express.Router();

/* GET home page. */

module.exports = (knex) => {

router.get('/', function(req, res, next) {
  res.render('index', {title:'Face App'});
});

return router;

}
