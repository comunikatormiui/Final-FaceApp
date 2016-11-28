'use strict';

const express = require('express');
const router = express.Router();

/* GET users listing. */
module.exports = (knex) => {


   router.get('/:id', function(req, res, next) {
     knex("users")
     .leftOuterJoin('photos', 'users.id', 'photos.user_id')
     .select('*')
     .where("users.id", req.params.id)
     .then((results) => {
        res.render('user', {
          data:results,
          user:req.session.user_id
        });
      })
   });

return router;

}
