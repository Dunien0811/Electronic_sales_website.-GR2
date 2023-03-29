'use strict';

const BaseControllerCRUD = require('../../base/BaseControllerCRUD');
const CategoryService = require('./service');

class CategoryController extends BaseControllerCRUD {
  constructor() {
    super(new CategoryService());
  }

  async getReportIncome(request) {
    try {
      return await this.service.getReportIncome(request.query);
    } catch (err) {
      throw err;
    }
  };
  async getReportProducts(request) {
    try {
      return await this.service.getReportProducts(request.query);
    } catch (err) {
      throw err;
    }
  };
  async getReportContact(request) {
    try {
      return await this.service.getReportContact(request.query);
    } catch (err) {
      throw err;
    }
  };
}

module.exports = CategoryController;
