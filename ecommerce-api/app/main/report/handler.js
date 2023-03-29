'use strict';

const CategoryController = require('./controller');
const validator = require('./validator');

const controller = new CategoryController();

exports.getReportIncome = {
  description: 'Get reportIncome list',
  notes: 'Return reportIncome items',
  tags: ['api', 'v1'],
  handler: controller.getReportIncome.bind(controller),
  auth: 'jwt',
  validate: {
    query: validator.getReportIncome
  }
};
exports.getReportProducts = {
  description: 'Get getReportProducts list',
  notes: 'Return getReportProducts items',
  tags: ['api', 'v1'],
  handler: controller.getReportProducts.bind(controller),
  auth: 'jwt',
  validate: {
    query: validator.getReportIncome
  }
};
exports.getReportContact = {
  description: 'Get getReportProducts list',
  notes: 'Return getReportProducts items',
  tags: ['api', 'v1'],
  handler: controller.getReportContact.bind(controller),
  auth: 'jwt',
  validate: {
    query: validator.getReportContact
  }
};

exports.exportExcel = {
  description: 'Export excel',
  notes: 'Return export excel',
  tags: ['api', 'v1'],
  handler: controller.exportExcel.bind(controller),
  auth: false,
  validate: {
    query: validator.queryParams
  }
};