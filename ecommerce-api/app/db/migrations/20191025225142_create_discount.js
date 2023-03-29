'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('discount', (table) => {
    table.increments('id').primary();
    table.string('nameDiscount');
    table.string('trigger');
    table.string('code').unique();
    table.double('totalToReach').defaultTo(0);
    table.string('type');
    table.float('rate');
    table.double('amount').defaultTo(0);
    table.integer('maxNumberOfUsages').defaultTo(0);
    table.integer('numberOfUsages').defaultTo(0);
    table.integer('shippingCost').defaultTo(0);
    table.timestamp('startTime');
    table.timestamp('endTime');
    table.boolean('isActive').defaultTo(true);
    table.jsonb('productId');
    table.timestamp('createdAt');
    table.timestamp('updatedAt');
  })
};

exports.down = function(knex) {
  return knex.schema.raw('DROP TABLE discount CASCADE')
};
