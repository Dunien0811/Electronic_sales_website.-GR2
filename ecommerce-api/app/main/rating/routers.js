'use strict';

const handler = require('./handler');

const Routes = [
  {
    method: 'GET',
    path: '/api/v1/ratings',
    config: handler.getAll
  },
  {
    method: 'GET',
    path: '/api/v1/product/{productId}/ratings',
    config: handler.getMany
  },
  {
    method: 'GET',
    path: '/api/v1/ratings/{id}',
    config: handler.getOne
  },
  {
    method: 'GET',
    path: '/api/v1/product/{productId}/ratings/count',
    config: handler.count
  },
  {
    method: 'POST',
    path: '/api/v1/product/{productId}/ratings',
    config: handler.createOne
  },
  {
    method: 'PUT',
    path: '/api/v1/ratings/{id}',
    config: handler.updateOne
  },
  {
    method: 'DELETE',
    path: '/api/v1/ratings/{id}',
    config: handler.deleteOne
  },
  {
    method: 'GET',
    path: '/api/v1/ratings/exportExcel',
    config: handler.exportExcel
  }
];

module.exports = Routes;
