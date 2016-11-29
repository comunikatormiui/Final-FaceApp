'use strict';

const express = require('express');
const router = express.Router();

const google = require('googleapis');
const storage = google.storage('v1');




/* GET home page. */
module.exports = (knex) => {

  router.get('/', function(req, res, next){
     if(req.session.user_id){
      res.redirect('/images');
    }else {
    res.render('welcome',{user: req.session.user_id});
  }

  })





  router.get('/images', function(req, res, next) {

    const get_bucket_promise = new Promise(function(resolve, reject) {
      google.auth.getApplicationDefault(function(err, authClient) {
        if (err) {
          console.log('Authentication failed because of ', err);
          return;
        }
        if (authClient.createScopedRequired && authClient.createScopedRequired()) {
          const scopes = ['https://www.googleapis.com/auth/cloud-platform'];
          authClient = authClient.createScoped(scopes);
        }

        const request = {
          bucket: "faceimages",
          auth: authClient
        };


        var recur = function(err, result) {
          if (err) {
            console.log(err);
          } else {
            //console.log(result.items);
            resolve(result.items);
            if (result.nextPageToken) {
              request.pageToken = result.nextPageToken;
              storage.objects.list(request, recur);
            }
          }
        };

        storage.objects.list(request, recur);

      })
    });


    get_bucket_promise.then(function(val) {

         knex.select('*').from('users').join('photos','users.id', 'photos.user_id').then((results)=>{

            const sorted_images = results.sort(function(a, b){
                let keyA = new Date(a.created_at),
                    keyB = new Date(b.created_at);
                // Compare the 2 dates
                if(keyA > keyB) return -1;
                if(keyA < keyB) return 1;
                return 0;
            });


           knex('likes').then((results)=>{


              const like_count = (arr) => {
              var likes = [];
                arr.forEach((image)=>{

                    var count = 0;
                    results.forEach((like)=>{
                      if(like.photo_id === image.id) {
                        count ++ ;
                      }
                    });
                     likes.push({photo_id:image.id,
                                    likes:count});
                })
                return likes;
              }

              var likes_data = like_count(sorted_images);





                 res.render('index', {
                      data: {images:sorted_images,
                              likes:likes_data},
                      user: req.session.user_id
                    });
            });
         });

      })
      .catch(function(err) {
        console.log('Failed to get Bucket items:', err);
      });

  });



  return router;





}
