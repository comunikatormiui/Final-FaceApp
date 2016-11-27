exports.seed = function(knex, Promise) {

  return knex('users').del()
    .then(function () {

      return Promise.all([
        knex('users').insert({ username: '@alex',
                               email: 'alex@face.com',
                               password: 'alex'}),

        knex('users').insert({ username: '@matt',
                               email: 'matt@face.com',
                               password: 'matt'})


      ]);
    });
};
