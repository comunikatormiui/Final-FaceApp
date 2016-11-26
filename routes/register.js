'use strict';
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs')

/* GET users listing. */
module.exports = (knex) => {

  router.get('/', function(req, res, next) {
    res.render('register')
  })

  router.post('/', function(req, res, next) {
    const name = req.body.username;
    const email = req.body.email;
    const password= bcrypt.hashSync(req.body.password);

    knex('users')
    .insert({
      id: 3,
      username: username,
      email: email,
      password: password
    })
    .return({inserted: true})

    res.redirect('/login')
  })

return router;

}
