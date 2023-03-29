'use strict';

const handler = require('./handler');

const Routes = [
  {
    method: 'GET',
    path: '/api/v1/discounts',
    config: handler.getMany
  },
  {
    method: 'GET',
    path: '/api/v1/discounts/{id}',
    config: handler.getOne
  },
  {
    method: 'GET',
    path: '/api/v1/discounts/count',
    config: handler.count
  },
  {
    method: 'POST',
    path: '/api/v1/discounts',
    config: handler.createOne
  },
  {
    method: 'PUT',
    path: '/api/v1/discounts/{id}',
    config: handler.updateOne
  },
  {
    method: 'DELETE',
    path: '/api/v1/discounts/{id}',
    config: handler.deleteOne
  },
  {
    method: 'GET',
    path: '/api/v1/discounts/exportExcel',
    config: handler.exportExcel
  }
];

module.exports = Routes;
