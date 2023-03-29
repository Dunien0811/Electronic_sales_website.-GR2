'use strict';

const handler = require('./handler');

const Routes = [
  {
    method: 'GET',
    path: '/api/v1/roles',
    config: handler.getMany
  },
  {
    method: 'GET',
    path: '/api/v1/roles/{id}',
    config: handler.getOne
  },
  {
    method: 'GET',
    path: '/api/v1/roles/count',
    config: handler.count
  },
  {
    method: 'POST',
    path: '/api/v1/roles',
    config: handler.createOne
  },
  {
    method: 'PUT',
    path: '/api/v1/roles/{id}',
    config: handler.updateOne
  },
  {
    method: 'DELETE',
    path: '/api/v1/roles/{id}',
    config: handler.deleteOne
  },
  {
    method: 'GET',
    path: '/api/v1/roles/exportExcel',
    config: handler.exportExcel
  }
];

module.exports = Routes;
