exports.seed = function(knex, Promise) {

  return knex('users').del()
    .then(function () {

      return Promise.all([
        knex('users').insert({ id: 1,
                               username: '@alex',
                               email: 'alex@face.com',
                               password: 'alex'}),

        knex('users').insert({ id: 2,
                               username: '@matt',
                               email: 'matt@face.com',
                               password: 'matt'})


      ]);
    });
};