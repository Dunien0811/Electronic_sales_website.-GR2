'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('category', (table) => {
    table.increments('id').primary();
    table.string('nameCategory');
    table.string('image');
    table.boolean('isActive').defaultTo(true);
    table.string('description');
    table.timestamp('createdAt');
    table.timestamp('updatedAt');
  })
};

exports.down = function(knex) {
  return knex.schema.raw('DROP TABLE category CASCADE')
};
