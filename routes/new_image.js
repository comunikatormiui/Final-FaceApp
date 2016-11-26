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
              name: 'botandobama.jpg',
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


  return router;
}






