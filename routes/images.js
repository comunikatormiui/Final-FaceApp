'use strict';

const express = require('express');
const router = express.Router();
const fs = require('fs');
const gcloud = require('google-cloud')
const storage = gcloud.storage;
const gcs = storage({
  projectId: 'faceapp',
  keyFilename: '/vagrant/bootcamp/final/final_time/faceapp-708537516d42.json'});

// Reference an existing bucket.
const bucket = gcs.bucket('faceimages');

/* GET new_image listing. */

module.exports = (knex) => {

router.get('/new', function(req, res, next) {
  const user = req.session.user_id
  if (user) {
    res.render('new_image', {
      title: "Face App",
      user: req.session.user_id
    });
  } else {
    req.flash('loginMessage', 'Must be logged in to replace a face')
    res.redirect('/login')
  }
});

router.post('/new', function (req, res, next){

    // Upload a local file to a new file to be created in your bucket.
    bucket.upload('/vagrant/bootcamp/final/images/obama.jpg', function(err, file) {
      if (!err) {
      }
    console.log("Unable to upload image to bucket", err);
    });

});

router.get('/:imageid', function(req, res, next) {

  knex('photos')
  .join('users', 'users.id', '=', 'photos.user_id')
  .select('title', 'bucket_url as image_url', 'users.username as username')
  .where('photos.id', req.params.imageid)
  .then((image) => {

    knex('comments')
    .join('users', 'users.id', '=', 'comments.user_id')
    .select('content', 'username')
    .where('comments.photo_id', req.params.imageid)
    .then((comments) => {

      knex('likes')
      .count('likes.id')
      .where('likes.photo_id', req.params.imageid)
      .then((likes) => {
        res.render('single_image', {
          user: req.session.user_id,
          image: image,
          comments: comments,
          likes: likes[0].count
        });
      })
    })
  })
});




return router;
}
