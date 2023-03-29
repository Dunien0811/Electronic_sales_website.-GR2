'use strict';

const controller = require('./controller');
const validator = require('./validator');

exports.countDashboard = {
  description: 'Get Dashboard admin list',
  notes: 'Return Dashboard admin items',
  tags: ['api', 'v1'],
  handler: controller.countDashboard,
  auth: {
    strategy: 'jwt',
  },
  validate: {
    headers: validator.checkToken,
    query: validator.validateCount
  }
};
