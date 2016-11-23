'use strict';

const express = require('express');
const router = express.Router();

const google = require('googleapis');
const storage = google.storage('v1');




/* GET home page. */
module.exports = (knex) => {


const auth_list = () => {

  return google.auth.getApplicationDefault(function(err, authClient) {
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
      }else {
       //console.log(result.items);

        if (result.nextPageToken) {
          request.pageToken = result.nextPageToken;
          storage.objects.list(request, recur);
        }
      }
    };

     storage.objects.list(request, recur);
  })
};


//auth_list();

const bucket_list = [ { kind: 'storage#object',
    id: 'faceimages/bolt.jpg/1479747850513000',
    selfLink: 'https://www.googleapis.com/storage/v1/b/faceimages/o/bolt.jpg',
    name: 'bolt.jpg',
    bucket: 'faceimages',
    generation: '1479747850513000',
    metageneration: '6',
    contentType: 'image/jpeg',
    timeCreated: '2016-11-21T17:04:10.507Z',
    updated: '2016-11-22T19:52:17.724Z',
    storageClass: 'MULTI_REGIONAL',
    timeStorageClassUpdated: '2016-11-21T17:04:10.507Z',
    size: '150291',
    md5Hash: 'K7YKj/cD2JiXC9EhRPGBeQ==',
    mediaLink: 'https://www.googleapis.com/download/storage/v1/b/faceimages/o/bolt.jpg?generation=1479747850513000&alt=media',
    crc32c: 'EikD1g==',
    etag: 'COjU8qequtACEAY=' },
  { kind: 'storage#object',
    id: 'faceimages/demo-image.jpg/1479415026201000',
    selfLink: 'https://www.googleapis.com/storage/v1/b/faceimages/o/demo-image.jpg',
    name: 'demo-image.jpg',
    bucket: 'faceimages',
    generation: '1479415026201000',
    metageneration: '2',
    contentType: 'image/jpeg',
    timeCreated: '2016-11-17T20:37:06.188Z',
    updated: '2016-11-17T20:37:55.563Z',
    storageClass: 'MULTI_REGIONAL',
    timeStorageClassUpdated: '2016-11-17T20:37:06.188Z',
    size: '167040',
    md5Hash: 'o4HBFwMl+uhWmfUgOlnCfw==',
    mediaLink: 'https://www.googleapis.com/download/storage/v1/b/faceimages/o/demo-image.jpg?generation=1479415026201000&alt=media',
    crc32c: 'tzJjUw==',
    etag: 'CKjj8rjSsNACEAI=' },
  { kind: 'storage#object',
    id: 'faceimages/dunk.jpg/1479415328294000',
    selfLink: 'https://www.googleapis.com/storage/v1/b/faceimages/o/dunk.jpg',
    name: 'dunk.jpg',
    bucket: 'faceimages',
    generation: '1479415328294000',
    metageneration: '2',
    contentType: 'image/jpeg',
    timeCreated: '2016-11-17T20:42:08.280Z',
    updated: '2016-11-17T21:56:21.676Z',
    storageClass: 'MULTI_REGIONAL',
    timeStorageClassUpdated: '2016-11-17T20:42:08.280Z',
    size: '369259',
    md5Hash: 'lIGfh3uANHEiy7QCerSbdQ==',
    mediaLink: 'https://www.googleapis.com/download/storage/v1/b/faceimages/o/dunk.jpg?generation=1479415328294000&alt=media',
    crc32c: '4I1EmA==',
    etag: 'CPCI+cjTsNACEAI=' },
  { kind: 'storage#object',
    id: 'faceimages/obama.jpg/1479747900747000',
    selfLink: 'https://www.googleapis.com/storage/v1/b/faceimages/o/obama.jpg',
    name: 'obama.jpg',
    bucket: 'faceimages',
    generation: '1479747900747000',
    metageneration: '2',
    contentType: 'image/jpeg',
    timeCreated: '2016-11-21T17:05:00.681Z',
    updated: '2016-11-21T17:05:19.813Z',
    storageClass: 'MULTI_REGIONAL',
    timeStorageClassUpdated: '2016-11-21T17:05:00.681Z',
    size: '38475',
    md5Hash: 'BvmTu3ualMVweyBErGvzfA==',
    mediaLink: 'https://www.googleapis.com/download/storage/v1/b/faceimages/o/obama.jpg?generation=1479747900747000&alt=media',
    crc32c: 'uJPyOA==',
    etag: 'CPjZ7L+qutACEAI=' } ]






router.get('/', function(req, res, next) {

  console.log("HOME PAGE");
  var self_links =[]
  bucket_list.forEach((photo) => {
    self_links.push(photo.name);
  });

  res.render('index', {data: self_links});
});

return router;





}
