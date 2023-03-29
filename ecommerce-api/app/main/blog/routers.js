'use strict';

const handler = require('./handler');

const Routes = [
  {
    method: 'GET',
    path: '/api/v1/blogs',
    config: handler.getMany
  },
  {
    method: 'GET',
    path: '/api/v1/blogs/{id}',
    config: handler.getOne
  },
  {
    method: 'GET',
    path: '/api/v1/blogs/count',
    config: handler.count
  },
  {
    method: 'POST',
    path: '/api/v1/blogs',
    config: handler.createOne
  },
  {
    method: 'PUT',
    path: '/api/v1/blogs/{id}',
    config: handler.updateOne
  },
  {
    method: 'DELETE',
    path: '/api/v1/blogs/{id}',
    config: handler.deleteOne
  },
  {
    method: 'GET',
    path: '/api/v1/blogs/exportExcel',
    config: handler.exportExcel
  }
];

module.exports = Routes;
