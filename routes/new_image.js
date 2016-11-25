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

  router.get('/', function(req, res, next) {
    res.render('new_image', {
      title: "Face App"
    });
  });

  router.post('/', function(req, res, next) {
    console.log("SendImagedata was clicked");

    function first(obj) {
      for (var a in obj) return a;
      }

    var imagebase64 = first(req.body);
    var imagebase64equal = imagebase64 + '=';


    console.log(imagebase64equal);






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


        resource: {
              name: 'image_test',
              mimeType: 'image/png',

        },

        media: {
          // See https://github.com/google/google-api-nodejs-client#media-uploads
          mimeType: 'image/png',
          base64decode: true,
          body: imagebase64

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


  return router;
}