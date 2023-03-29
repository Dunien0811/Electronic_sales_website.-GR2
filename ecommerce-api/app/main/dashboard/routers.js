'use strict';

const handler = require('./handler');

const Routes = [
  {
    method: 'GET',
    path: '/api/v1/dashboards',
    config: handler.countDashboard
  }
];

module.exports = Routes;
