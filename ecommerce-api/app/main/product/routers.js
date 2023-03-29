'use strict';

const handler = require('./handler');

const Routes = [
  {
    method: 'GET',
    path: '/api/v1/products',
    config: handler.getMany
  },
  {
    method: 'GET',
    path: '/api/v1/products/{id}',
    config: handler.getOne
  },
  {
    method: 'GET',
    path: '/api/v1/products/category/{categoryId}/point/{point}',
    config: handler.getProductPointRating
  },
  {
    method: 'GET',
    path: '/api/v1/producer/{id}/products',
    config: handler.getProductByProducer
  },
  {
    method: 'GET',
    path: '/api/v1/products/count',
    config: handler.count
  },
  {
    method: 'POST',
    path: '/api/v1/products',
    config: handler.createOne
  },
  {
    method: 'PUT',
    path: '/api/v1/products/{id}',
    config: handler.updateOne
  },
  {
    method: 'PUT',
    path: '/api/v1/products/{id}/updateNumberAvailable',
    config: handler.updateNumberAvailable
  },
  {
    method: 'DELETE',
    path: '/api/v1/products/{id}',
    config: handler.deleteOne
  },
  {
    method: 'GET',
    path: '/api/v1/products/exportExcel',
    config: handler.exportExcel
  }
];

module.exports = Routes;
