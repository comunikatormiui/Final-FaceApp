exports.seed = function(knex, Promise) {

  return knex('comments').del()
    .then(function () {

      return Promise.all([
        knex('comments').insert({ user_id: 1,
                                  photo_id: 3,
                                  content: "Nice dunk!"
                                  }),

        knex('comments').insert({ user_id: 2,
                                  photo_id: 3,
                                  content: "Awesome!"})


      ]);
    });
};
