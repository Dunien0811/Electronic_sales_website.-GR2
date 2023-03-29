'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('order', (table) => {
    table.increments('id').primary();
    table.string('fullName');
    table.jsonb('address');
    table.text('note');
    table.string('phone');
    table.string('status').defaultTo('Unconfirm');
    table.string('paypalCode');
    table.boolean('isPaymentOnline').defaultTo(false);
    table.boolean('isPaid').defaultTo(false);
    table.double('shippingTotal');
    table.double('itemAmount');
    table.double('promoTotal').defaultTo(0);
    table.double('totalAmount');
    table.integer('userId');
    table.timestamp('createdAt');
    table.timestamp('updatedAt');

    table.index('status');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('order');
};
