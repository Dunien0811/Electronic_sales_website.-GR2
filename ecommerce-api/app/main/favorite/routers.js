'use strict';

const handler = require('./handler');

const Routes = [
  {
    method: 'GET',
    path: '/api/v1/favorites',
    config: handler.getMany
  },
  {
    method: 'GET',
    path: '/api/v1/favorites/{id}',
    config: handler.getOne
  },
  {
    method: 'POST',
    path: '/api/v1/favorites/product/{productId}',
    config: handler.createOne
  },
  {
    method: 'DELETE',
    path: '/api/v1/favorites/{id}',
    config: handler.deleteOne
  },
  {
    method: 'GET',
    path: '/api/v1/favorites/exportExcel',
    config: handler.exportExcel
  }
];

module.exports = Routes;
