'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs')

/* GET users listing. */
module.exports = (knex) => {

  router.get('/', (req, res, next) => {

     if(req.session.user_id){
      res.redirect('/images');
    }else {
    res.render('login', {
      user: req.session.user_id,
      message: req.flash('loginMessage')
    })
  }
  })

  router.post('/', (req, res, next) => {
    knex
      .select('*')
      .from('users')
      .where('email', req.body.email)
      .then((results) => {
        if (results[0] && bcrypt.compareSync(req.body.password, results[0].password)) {
          req.session.user_id = results[0].id;
          res.redirect(`/users/${req.session.user_id}`)
        } else {
          req.flash('loginMessage', 'Incorrect username or password')
          return res.redirect('login')
        }
      })
  })

return router;

}
