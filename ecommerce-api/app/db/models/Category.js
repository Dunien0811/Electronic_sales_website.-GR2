'use strict';

const CustomModel = require('./CustomModel');

class Category extends CustomModel {
  static get tableName() {
    return 'category';
  }
  $beforeInsert() {
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
}

module.exports = Category;