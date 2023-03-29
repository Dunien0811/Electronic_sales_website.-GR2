'use strict';

const BaseControllerCRUD = require('../../base/BaseControllerCRUD');
const RoleService = require('./service');

class RoleController extends BaseControllerCRUD {
  constructor() {
    super(new RoleService());
  }
}

module.exports = RoleController;
