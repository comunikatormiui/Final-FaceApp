'use strict';

const express = require('express');
const router = express.Router();

/* GET users listing. */
module.exports = (knex) => {

/*  router.get('/:id', function(req, res, next) {
      knex
      .select("*")
      .from("users")
      .where("id",req.params.id)
      .then((results) => {
           console.log("User Profile");
           console.log(results);
           res.render('user', {data:results});
          })
  });*/

  // router.get('/:id', function(req, res, next) {
  //   knex("users")
  //   .join('photos', 'users.id', 'photos.user_id')
  //   .select('*')
  //   .where("user_id", req.params.id)
  //   .then((results) => {
  //        console.log("User Profile");
  //        res.render('user', {data:results});
  //       })
  // });

return router;

}
