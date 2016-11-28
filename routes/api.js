'use strict';

const express = require('express');
const router = express.Router();

module.exports = (knex) => {

  router.get('/images/:imageid/comments', function(req, res, next) {
    knex('comments')
    .join('users', 'users.id', '=', 'comments.user_id')
    .join('photos', 'photos.id', '=', 'comments.photo_id')
    .select('content', 'username', 'created_at')
    .where('photo_id', req.params.imageid)
    .then((results) => {
      res.json(results)
    })
  })

  router.post('/images/:imageid/comments', function(req, res, next) {
    knex('comments')
    .insert({ user_id: req.session.user_id,
              photo_id: req.params.imageid,
              content: req.body.comment})
    .return({inserted: true})
  })

  router.get('/images/:imageid/likes', function(req, res, next) {
    knex('likes')
    .join('users', 'users.id', '=', 'likes.user_id')
    .join('photos', 'photos.id', '=', 'likes.photo_id')
    .where('photo_id', req.params.imageid)
    .select('username')
    .then((results) => {
      res.json(results)
    })
  })

  router.post('/images/:imageid/likes', function(req, res, next) {
    knex('likes')
    .insert({ user_id: req.session.user_id,
              photo_id: req.params.imageid})
    .return({inserted: true})
  })



  return router;
}
