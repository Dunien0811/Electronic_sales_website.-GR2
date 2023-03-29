'use strict';

const Models = require('../../db/models');
const BaseServiceCRUD = require('../../base/BaseServiceCRUD');

class RoleService extends BaseServiceCRUD {
  constructor() {
    super(Models.Role, 'Role');
  }
  getSearchQuery(builder, q) {
    builder.andWhere(function (){
      this.whereRaw('LOWER("nameRole") LIKE \'%\' || LOWER(?) || \'%\' ', q);
    });
  }
}

module.exports = RoleService;
