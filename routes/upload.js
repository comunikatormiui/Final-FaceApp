'use strict';

const fs = require('fs');



console.log("Authenticating..")
// Authenticating on a global basis.
const projectId = process.env.GCLOUD_PROJECT;

const gcloud = require('google-cloud')({
  projectId: projectId,

  // The path to your key file:
  keyFilename: '/vagrant/bootcamp/final/final_time/faceapp-708537516d42.json'

  // Or the contents of the key file:
  //credentials: require('./path/to/keyfile.json')

  // For any APIs that accept an API key:
  //key: '...'
});

const storage = gcloud.storage;


console.log("Lets try and upload image");

// ...you're good to go! See the next section to get started using the APIs.

var gcs = storage({
  projectId: 'faceapp',
  keyFilename: '/vagrant/bootcamp/final/final_time/faceapp-708537516d42.json'
});

// Create a new bucket.
/*gcs.createBucket('my-new-bucket', function(err, bucket) {
  if (!err) {
    // "my-new-bucket" was successfully created.
  }
});*/

// Reference an existing bucket.
var bucket = gcs.bucket('faceimages');

// Upload a local file to a new file to be created in your bucket.
bucket.upload('/vagrant/bootcamp/final/images/obama.jpg', function(err, file) {
  if (!err) {
    // "zebra.jpg" is now in your bucket.
  }
});


