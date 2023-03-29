'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('orderDetail', (table) => {
    table.increments('id').primary();
    table.integer('quantity');
    table.double('price');
    table.integer('orderId');
    table.integer('productId');
    table.string('nameProduct');
    table.timestamp('createdAt');
    table.timestamp('updatedAt');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('orderDetail');
};
