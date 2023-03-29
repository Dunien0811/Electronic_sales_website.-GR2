'use strict';

const handler = require('./handler');

const Routes = [
  {
    method: 'GET',
    path: '/api/v1/orderDetails',
    config: handler.getMany
  },
  {
    method: 'GET',
    path: '/api/v1/orderDetails/{id}',
    config: handler.getOne
  },
  {
    method: 'GET',
    path: '/api/v1/order/{id}/orderDetails',
    config: handler.getOrderDetailOfOrder
  },
  {
    method: 'GET',
    path: '/api/v1/orderDetails/count',
    config: handler.count
  },
  {
    method: 'POST',
    path: '/api/v1/orderDetails',
    config: handler.createOne
  },
  {
    method: 'PUT',
    path: '/api/v1/orderDetails/{id}',
    config: handler.updateOne
  },
  {
    method: 'DELETE',
    path: '/api/v1/orderDetails/{id}',
    config: handler.deleteOne
  },
  {
    method: 'GET',
    path: '/api/v1/orderDetails/exportExcel',
    config: handler.exportExcel
  }
];

module.exports = Routes;
