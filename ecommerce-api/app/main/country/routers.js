'use strict';

const handler = require('./handler');

const Routes = [
  {
    method: 'GET',
    path: '/api/v1/provinces',
    config: handler.getMany
  },
  {
    method: 'GET',
    path: '/api/v1/provinces/{code}/states',
    config: handler.getOne
  }
];

module.exports = Routes;
