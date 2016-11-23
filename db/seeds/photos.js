exports.seed = function(knex, Promise) {

  return knex('photos').del()
    .then(function () {

      return Promise.all([
        knex('photos').insert({ id: 1,
                               user_id: 1,
                               title: '100m dash - Bolt',
                               bucket_url: 'https://storage.googleapis.com/faceimages/@alex_1.jpg'}),

        knex('photos').insert({ id: 2,
                               user_id: 1,
                               title: 'Dog in Field',
                               bucket_url: 'https://storage.googleapis.com/faceimages/@alex_2.jpg'}),
        knex('photos').insert({ id: 3,
                               user_id: 2,
                               title: 'Lebron Dunk!',
                               bucket_url: 'https://storage.googleapis.com/faceimages/@matt_1.jpg'}),
        knex('photos').insert({ id: 4,
                               user_id: 2,
                               title: 'Obama is Chill',
                               bucket_url: 'https://storage.googleapis.com/faceimages/@matt_2.jpg'})

      ]);
    });
};


