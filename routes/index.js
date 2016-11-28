'use strict';

const express = require('express');
const router = express.Router();

const google = require('googleapis');
const storage = google.storage('v1');




/* GET home page. */
module.exports = (knex) => {


  router.get('/', function(req, res, next) {

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


    knex('users')
.join('contacts', 'users.id', '=', 'contacts.user_id')
.select('users.id', 'contacts.phone')




    get_bucket_promise.then(function(val) {
       //let self_links = [];

       knex('photos').join('users', 'photos.user_id','users.id').then((results)=>{

         const sorted_images = results.sort(function(a, b){
                let keyA = new Date(a.created_at),
                    keyB = new Date(b.created_at);
                // Compare the 2 dates
                if(keyA > keyB) return -1;
                if(keyA < keyB) return 1;
                return 0;
            });


         console.log(results);









     /*  val.forEach((photo) => {
        self_links.push(photo.name);
      });*/
       res.render('index', {
        data: sorted_images,
        user: req.session.user_id
      });

      })
      })
      .catch(function(err) {
        console.log('Failed to get Bucket items:', err);
      });

  });



  return router;





}
