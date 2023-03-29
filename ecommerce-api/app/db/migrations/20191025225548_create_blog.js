'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('blog', (table) => {
    table.increments('id').primary();
    table.string('title');
    table.text('content');
    table.string('note');
    table.integer('userId');
    table.boolean('isActive').defaultTo(false);
    table.timestamp('createdAt');
    table.timestamp('updatedAt');

    table.index('title');
  })
};

exports.down = function(knex) {
  return knex.schema.raw('DROP TABLE blog CASCADE')
};
