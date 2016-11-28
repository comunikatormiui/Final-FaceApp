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
            table.integer('user_id');
            table.string('title');
            table.string('bucket_url');
            table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
            table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
        }),

        knex.schema.createTable('comments', function(table){
            table.increments('id').primary();
            table.integer('user_id');
            table.integer('photo_id');
            table.string('content');
            table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
            table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
        }),

        knex.schema.createTable('likes', function(table){
            table.increments('id').primary();
            table.integer('user_id');
            table.integer('photo_id');
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
