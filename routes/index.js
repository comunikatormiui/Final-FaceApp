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




    get_bucket_promise.then(function(val) {
       var self_links = [];

       val.forEach((photo) => {
        self_links.push(photo.name);
      });
       res.render('index', {
        data: self_links,
        user: req.session.user_id
      });


      })
      .catch(function(err) {
        console.log('Failed to get Bucket items:', err);
      });

  });



  return router;





}
