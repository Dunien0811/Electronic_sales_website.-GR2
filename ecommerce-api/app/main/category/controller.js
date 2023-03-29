'use strict';

const BaseControllerCRUD = require('../../base/BaseControllerCRUD');
const CategoryService = require('./service');

class CategoryController extends BaseControllerCRUD {
  constructor() {
    super(new CategoryService());
  }

  async getManyProductOfCategory(request) {
    const { id } = request.params;
    try {
      return await this.service.getManyProductOfCategory(request.query, id);
    } catch (err) {
      throw err;
    }
  };
}

module.exports = CategoryController;
