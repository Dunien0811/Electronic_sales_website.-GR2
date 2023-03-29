'use strict';

const service = require('./service');

exports.countDashboard = async (request) => {
  try {
    return await service.countDashboard(request.query);
  } catch (err) {
    throw err;
  }
};