exports.seed = function(knex, Promise) {

  return knex('likes').del()
    .then(function () {

      return Promise.all([
        knex('likes').insert({ user_id: 1,
                                photo_id: 3}),

        knex('likes').insert({ user_id: 2,
                                  photo_id: 3})


      ]);
    });
};
