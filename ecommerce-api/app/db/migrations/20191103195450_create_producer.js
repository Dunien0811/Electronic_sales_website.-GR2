'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('producer', (table) => {
    table.increments('id').primary();
    table.string('name');
    table.string('address');
    table.string('image');
    table.text('description');
    table.integer('categoryId');
    table.boolean('isActive').defaultTo(true);

  })
};

exports.down = function(knex) {
  return knex.schema.raw('DROP TABLE producer CASCADE')
};
