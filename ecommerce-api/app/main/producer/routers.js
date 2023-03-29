'use strict';

const handler = require('./handler');

const Routes = [
  {
    method: 'GET',
    path: '/api/v1/producers',
    config: handler.getMany
  },
  {
    method: 'GET',
    path: '/api/v1/category/{id}/producers',
    config: handler.getManyByCategoryId
  },
  {
    method: 'GET',
    path: '/api/v1/producers/{id}',
    config: handler.getOne
  },
  {
    method: 'GET',
    path: '/api/v1/producers/count',
    config: handler.count
  },
  {
    method: 'POST',
    path: '/api/v1/producers',
    config: handler.createOne
  },
  {
    method: 'PUT',
    path: '/api/v1/producers/{id}',
    config: handler.updateOne
  },
  {
    method: 'DELETE',
    path: '/api/v1/producers/{id}',
    config: handler.deleteOne
  },
  {
    method: 'GET',
    path: '/api/v1/producers/exportExcel',
    config: handler.exportExcel
  }
];

module.exports = Routes;
