'use strict';

const handler = require('./handler');

const Routes = [
  {
    method: 'GET',
    path: '/api/v1/users',
    config: handler.getManyUser
  },
  {
    method: 'GET',
    path: '/api/v1/users/me',
    config: handler.getMe
  },
  {
    method: 'PUT',
    path: '/api/v1/users/me',
    config: handler.updateMe
  },
  {
    method: 'PUT',
    path: '/api/v1/users/me/changePassword',
    config: handler.changePassword
  },
  {
    method: 'GET',
    path: '/api/v1/users/{id}',
    config: handler.getOneUser
  },
  {
    method: 'GET',
    path: '/api/v1/users/me/historyBooking',
    config: handler.getHistoryBooking
  },
  {
    method: 'PUT',
    path: '/api/v1/users/order/{id}/cancel',
    config: handler.cancelOrder
  },
  {
    method: 'GET',
    path: '/api/v1/users/count',
    config: handler.count
  },
  {
    method: 'POST',
    path: '/api/v1/users',
    config: handler.createOneUser
  },
  {
    method: 'PUT',
    path: '/api/v1/users/{id}',
    config: handler.updateOneUser
  },
  {
    method: 'DELETE',
    path: '/api/v1/users/{id}',
    config: handler.deleteOne
  },
  {
    method: 'GET',
    path: '/api/v1/users/exportExcel',
    config: handler.exportExcel
  }
];

module.exports = Routes;
