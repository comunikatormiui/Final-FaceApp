'use strict';

const express = require('express');
const router = express.Router();

/* GET users listing. */
module.exports = (knex) => {

  router.get('/', function(req, res, next) {
    res.render('login')
  })

return router;

}
