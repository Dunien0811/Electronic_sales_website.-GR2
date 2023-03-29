'use strict';

const CustomModel = require('./CustomModel');

class Role extends CustomModel {
  static get tableName() {
    return 'role';
  }
}
module.exports = Role;