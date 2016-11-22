
exports.up = function(knex, Promise) {

  return Promise.all([

        knex.schema.createTable('users', function(table) {
            table.increments('id').primary();
            table.string('username');
            table.string('email');
            table.string('password');
        }),

        knex.schema.createTable('photos', function(table){
            table.increments('id').primary();
            table.integer('user_id')
                 .references('id')
                 .inTable('users');
            table.string('title');
            table.string('bucket_url');
            table.timestamps();
        }),

        knex.schema.createTable('comments', function(table){
            table.increments('id').primary();
            table.integer('user_id')
                 .references('id')
                 .inTable('users');
            table.integer('photo_id')
                 .references('id')
                 .inTable('photos');
            table.string('content');
            table.dateTime('postDate');
        }),

        knex.schema.createTable('likes', function(table){
            table.increments('id').primary();
            table.integer('user_id')
                 .references('id')
                 .inTable('users');
            table.integer('photo_id')
                 .references('id')
                 .inTable('photos');
        })
      ])
};

exports.down = function(knex, Promise) {

    return Promise.all([
        knex.schema.dropTable('users'),
        knex.schema.dropTable('photos'),
        knex.schema.dropTable('comments'),
        knex.schema.dropTable('likes')
    ])
};
