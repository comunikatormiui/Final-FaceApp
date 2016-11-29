'use strict';

const express = require('express');
const router = express.Router();

module.exports = (knex) => {

  router.get('/images/:imageid/comments', (req, res, next) => {
    knex('comments')
    .join('users', 'users.id', '=', 'comments.user_id')
    .join('photos', 'photos.id', '=', 'comments.photo_id')
    .select('comments.id', 'comments.user_id', 'content', 'username', 'comments.created_at')
    .where('photo_id', req.params.imageid)
    .then((results) => {
      results.sort((a, b) => {return a.id - b.id})
      res.json(results)
    })
  })

  router.post('/images/:imageid/comments', (req, res, next) => {
    knex('comments')
    .insert({ user_id: req.session.user_id,
              photo_id: req.params.imageid,
              content: req.body.comment})
    .return({inserted: true})
  })

  router.post('/images/:imageid/uncomment', (req, res, next) => {
    knex('comments')
    .where('id', req.body.commentid)
    .del()
    .return({inserted: true})
  })

  router.get('/images/:imageid/likes', (req, res, next) => {
    knex('likes')
    .join('users', 'users.id', '=', 'likes.user_id')
    .join('photos', 'photos.id', '=', 'likes.photo_id')
    .where('photo_id', req.params.imageid)
    .select('username')
    .then((results) => {
      res.json(results)
    })
  })

  router.post('/images/:imageid/likes', (req, res, next) => {
    knex('likes')
    .where('photo_id', req.params.imageid)
    .andWhere('user_id', req.session.user_id)
    .then((results) => {
      if (!results[0]) {
        knex('likes')
        .insert({ user_id: req.session.user_id,
                  photo_id: req.params.imageid})
        .return({inserted: true})
      }
    })

  })

  router.post('/images/:imageid/unlike', (req, res, next) => {
    knex('likes')
    .where('photo_id', req.params.imageid)
    .andWhere('user_id', req.session.user_id)
    .del()
    .return({inserted: true})
  })



  return router;
}
