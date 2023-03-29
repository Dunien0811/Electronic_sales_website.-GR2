'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('rating', (table) => {
    table.increments('id').primary();
    table.string('content');
    table.integer('userId');
    table.float('point');
    table.integer('productId');
    table.timestamp('createdAt');
    table.timestamp('updatedAt');

  })
};

exports.down = function(knex) {
  return knex.schema.raw('DROP TABLE rating CASCADE')
};
