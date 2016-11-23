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

router.get('/', function(req, res, next) {
  res.render('new_image', {title: "Face App"});
});

router.post('/', function (req, res, next){

    // Upload a local file to a new file to be created in your bucket.
    bucket.upload('/vagrant/bootcamp/final/images/obama.jpg', function(err, file) {
      if (!err) {
      }
    console.log("Unable to upload image to bucket", err);
    });

});


return router;
}
