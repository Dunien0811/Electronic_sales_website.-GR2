'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('product', (table) => {
    table.increments('id').primary();
    table.string('nameProduct');
    table.string('image');
    table.double('price');
    table.text('description');
    table.integer('numberAvailable');
    table.jsonb('properties');
    table.jsonb('gallery').defaultTo(null);
    table.boolean('isActive').defaultTo(true);
    table.integer('categoryId');
    table.integer('producerId');
    table.timestamp('createdAt');
    table.timestamp('updatedAt');

    table.index('nameProduct');

  })
};

exports.down = function(knex) {
  return knex.schema.raw('DROP TABLE product CASCADE')
};
