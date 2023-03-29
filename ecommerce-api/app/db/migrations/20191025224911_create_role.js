'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('role', (table) => {
    table.increments('id').primary();
    table.string('nameRole');
    table.string('description');
    table.boolean('isActive').defaultTo(true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('role');
};
