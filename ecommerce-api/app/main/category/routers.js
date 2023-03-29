'use strict';

const handler = require('./handler');

const Routes = [
  {
    method: 'GET',
    path: '/api/v1/categories',
    config: handler.getMany
  },
  {
    method: 'GET',
    path: '/api/v1/categories/{id}',
    config: handler.getOne
  },
  {
    method: 'GET',
    path: '/api/v1/categories/count',
    config: handler.count
  },
  {
    method: 'POST',
    path: '/api/v1/categories',
    config: handler.createOne
  },
  {
    method: 'PUT',
    path: '/api/v1/categories/{id}',
    config: handler.updateOne
  },
  {
    method: 'DELETE',
    path: '/api/v1/categories/{id}',
    config: handler.deleteOne
  },
  {
    method: 'GET',
    path: '/api/v1/categories/{id}/products',
    config: handler.getManyProductOfCategory
  },
  {
    method: 'GET',
    path: '/api/v1/categories/exportExcel',
    config: handler.exportExcel
  }
];

module.exports = Routes;
