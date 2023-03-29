'use strict';

const CustomModel = require('./CustomModel');

class Discount extends CustomModel {
  static get tableName() {
    return 'discount';
  }
  $beforeInsert() {
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
}

module.exports = Discount;