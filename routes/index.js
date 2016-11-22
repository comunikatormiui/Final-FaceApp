'use strict';

const express = require('express');
const router = express.Router();
const google = require('googleapis');
const storage = google.storage('v1');



/* GET home page. */
module.exports = (knex) => {

/*google.auth.getApplicationDefault(function(err, authClient) {
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
    auth: authClient
  };


  var recur = function(err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      if (result.nextPageToken) {
        request.pageToken = result.nextPageToken;
        storage.objects.list(request, recur);
      }
    }
  };
  console.log(storage.objects.list(request, recur))
  storage.objects.list(request, recur);
});
*/





router.get('/', function(req, res, next) {
  res.render('index', {title:'Face App'});
});

return router;

}
