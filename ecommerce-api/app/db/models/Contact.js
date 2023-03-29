'use strict';

const CustomModel = require('./CustomModel');

class Contact extends CustomModel {
  static get tableName() {
    return 'contact';
  }
  $beforeInsert() {
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
}
module.exports = Contact;