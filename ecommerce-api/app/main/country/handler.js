'use strict';

const controller = require('./controller');
const validator = require('./validator');

exports.getMany = {
  description: 'Get a countries list',
  notes: 'Return a countries list',
  tags: ['api', 'v1'],
  handler: controller.getMany,
  auth: false,
  validate: {
    query: validator.searchParams
  }
};

exports.getOne = {
  description: 'Get list states of countries',
  notes: 'Return a list states of countries',
  tags: ['api', 'v1'],
  handler: controller.getOne,
  auth: false,
  validate: {
    query: validator.searchParams
  }
};
