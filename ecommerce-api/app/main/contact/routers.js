'use strict';

const handler = require('./handler');

const Routes = [
  {
    method: 'GET',
    path: '/api/v1/contacts',
    config: handler.getMany
  },
  {
    method: 'GET',
    path: '/api/v1/contacts/{id}',
    config: handler.getOne
  },
  {
    method: 'GET',
    path: '/api/v1/contacts/count',
    config: handler.count
  },
  {
    method: 'POST',
    path: '/api/v1/contacts',
    config: handler.createOne
  },
  {
    method: 'PUT',
    path: '/api/v1/contacts/{id}',
    config: handler.updateOne
  },
  {
    method: 'DELETE',
    path: '/api/v1/contacts/{id}',
    config: handler.deleteOne
  },
  {
    method: 'GET',
    path: '/api/v1/contacts/exportExcel',
    config: handler.exportExcel
  }
];

module.exports = Routes;
