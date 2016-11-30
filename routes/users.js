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

       const sorted_images = results.sort(function(a, b){
           let keyA = new Date(a.created_at),
               keyB = new Date(b.created_at);
           // Compare the 2 dates
           if(keyA > keyB) return -1;
           if(keyA < keyB) return 1;
           return 0;
       });

        res.render('user', {
          data:sorted_images,
          user:req.session.user_id
        });
      })
   });

return router;

}
