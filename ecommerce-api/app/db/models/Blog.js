'use strict';

const CustomModel = require('./CustomModel');
class Blog extends CustomModel {
  static get tableName() {
    return 'blog';
  }
  $beforeInsert() {
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
}

module.exports = Blog;