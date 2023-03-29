'use strict';

exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('name');
    table.string('address');
    table.string('email').unique();;
    table.string('password');
    table.string('avatar');
    table.string('phone');
    table.boolean('isActive').defaultTo(true);
    table.boolean('isVerifyEmail').defaultTo(false);
    table.string('resetPasswordToken');
    table.timestamp('resetPasswordExpire');
    table.string('rememberPasswordToken');
    table.integer('roleId').defaultTo(4);
    table.timestamp('createdAt');
    table.timestamp('updatedAt');

    table.index('email');
    table.index('phone');
  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};
