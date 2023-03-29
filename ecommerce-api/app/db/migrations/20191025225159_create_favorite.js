'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('favorite', (table) => {
    table.increments('id').primary();
    table.string('userId');
    table.string('productId');
  })
};

exports.down = function(knex) {
  return knex.schema.raw('DROP TABLE favorite CASCADE')
};
