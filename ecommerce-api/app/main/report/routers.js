'use strict';

const handler = require('./handler');

const Routes = [
  {
    method: 'GET',
    path: '/api/v1/reports/income',
    config: handler.getReportIncome
  },
  {
    method: 'GET',
    path: '/api/v1/reports/products',
    config: handler.getReportProducts
  },
  {
    method: 'GET',
    path: '/api/v1/reports/contacts',
    config: handler.getReportContact
  },
  {
    method: 'GET',
    path: '/api/v1/reports/exportExcel',
    config: handler.exportExcel
  }
];

module.exports = Routes;
