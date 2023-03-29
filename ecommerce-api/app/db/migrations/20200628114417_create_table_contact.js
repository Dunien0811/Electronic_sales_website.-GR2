'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('contact', (table) => {
    table.increments('id').primary();
    table.string('name');
    table.string('email');
    table.string('subject');
    table.string('message');

    table.timestamp('createdAt');
    table.timestamp('updatedAt');
  })
};

exports.down = function(knex) {
  return knex.schema.raw('DROP TABLE contact CASCADE')
};