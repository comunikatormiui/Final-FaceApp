'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs')

/* GET users listing. */
module.exports = (knex) => {

  router.get('/', (req, res, next) => {
    res.render('login')
  })

  router.post('/', (req, res, next) => {
    knex
      .select('*')
      .from('users')
      .where('email', '=', req.body.email)
      .then((results) => {
        if (results) {
          req.session.user_id = results[0].id;
          res.redirect('/')
        } else {
          res.send("Incorrect username or password")
        }
      })
  })

return router;

}
