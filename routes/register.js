'use strict';
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs')

/* GET users listing. */
module.exports = (knex) => {

  router.get('/', function(req, res, next) {

    if(req.session.user_id){
      res.redirect('/images');
    }else {
    res.render('register', {
      user: req.session.user_id,
      message: req.flash('registerMessage')
    })
  }
  })

  router.post('/', function(req, res, next) {
    const username = req.body.username;
    const email = req.body.email;
    const password= bcrypt.hashSync(req.body.password);

    knex
      .select('*')
      .from('users')
      .where('email', email)
      .orWhere('username', username)
      .then((results) => {
        if (!results[0]) {
          knex('users')
          .insert({
            username: username,
            email: email,
            password: password
          })
          .return({inserted: true})

          knex('users')
          .max('id')
          .then((results) => {
            console.log(results)
            req.session.user_id = results[0].max + 1;
            res.redirect(`/users/${req.session.user_id}`)
          })

        } else {
          if (results[0].username === username) {
            req.flash('registerMessage', 'Username is already taken')
          } else if (results[0].email === email) {
            req.flash('registerMessage', 'Email is already taken')
          };
          return res.redirect('/register')
        }



      })

  })

return router;

}
