'use strict';

const express = require('express');
const router = express.Router();
const fs = require('fs');
const gcloud = require('google-cloud')
const gstorage = gcloud.storage;
const gcs = gstorage({
  projectId: 'faceapp',
  keyFilename: '/vagrant/bootcamp/final/final_time/faceapp-708537516d42.json'
});


const base = require('base64-arraybuffer');

// Reference an existing bucket.
const bucket = gcs.bucket('faceimages');

const google = require('googleapis');
const storage = google.storage('v1');



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

  router.post('/new', function (req, res, next) {
      console.log("SendImagedata was clicked");
      const current_user_id = req.session.user_id ;
      const title = req.body.title;
      let current_username ;
      let image_name ;
      let url ;
      let image_count ;
      let total_photos;


    knex('users').where({id:current_user_id}).then((results) =>{
        console.log(results[0].username);
        current_username = results[0].username;

      knex('photos').count('user_id').where({user_id:current_user_id}).then((results)=>{
        let image_int = +results[0].count + 1;
        image_count = image_int.toString()
        console.log(image_count);

        image_name = `${current_username}_${image_count}.jpg`;
        url =`https://storage.googleapis.com/faceimages/${image_name}`;

        knex('photos').count('id').then((results)=>{
          total_photos = +results[0].count +1 ;

          knex('photos').insert({
              id: total_photos,
              user_id: current_user_id,
              title: title,
              bucket_url: url
            })
          .return({inserted: true}).then((results)=> {

            var b64string = req.body.imagedata64;
            var buf = Buffer.from(b64string, 'base64'); // Ta-da


            google.auth.getApplicationDefault(function(err, authClient) {
              if (err) {
                console.log('Authentication failed because of ', err);
                return;
              }
              if (authClient.createScopedRequired && authClient.createScopedRequired()) {
                var scopes = ['https://www.googleapis.com/auth/cloud-platform'];
                authClient = authClient.createScoped(scopes);
              }


              var request = {
                bucket: "faceimages",
                predefinedAcl: "publicRead",

                resource: {
                      name: image_name,
                      mimeType: 'image/jpg',
                },

                media: {
                  // See https://github.com/google/google-api-nodejs-client#media-uploads
                  mimeType: 'image/jpg',
                  body: buf,
                  base64encode: true
                },
                // Auth client
                auth: authClient
              };

              storage.objects.insert(request, function(err, result) {
                if (err) {
                  console.log('Faild to upload:',err);
                } else {
                  console.log('Upload Successful:',result);
                }
              });
            });
          });
        });

        res.redirect('/');
      }).catch((err)=>{
        console.log("Error Saving image info to DB and Uploading Image to GC:",err);
      })
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
            id: req.params.imageid,
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
