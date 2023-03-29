'use strict';

const OrderController = require('./controller');
const validator = require('./validator');

const controller = new OrderController();

exports.getMany = {
  description: 'Get Order list',
  notes: 'Return Order items',
  tags: ['api', 'v1'],
  handler: controller.getMany.bind(controller),
  auth: 'jwt',
  validate: {
    query: validator.searchParams
  }
};

exports.count = {
  description: 'Count Order list',
  notes: 'Return a count result of Order items',
  tags: ['api', 'v1'],
  handler: controller.count.bind(controller),
  auth: {
    strategy: 'jwt',
    scope: ['admin', 'superadmin','staff']
  },
  validate: {
    headers: validator.checkToken
  }
};

exports.getOne = {
  description: 'Get a Order',
  notes: 'Return a Order by id',
  tags: ['api', 'v1'],
  handler: controller.getOne.bind(controller),
  auth: 'jwt',
  validate: {
    params: {
      id: validator.idParam
    }
  }
};

exports.createOne = {
  description: 'Create a new Order',
  notes: 'Return created Order',
  tags: ['api', 'v1'],
  handler: controller.createOne.bind(controller),
  auth: 'jwt',
  validate: {
    headers: validator.checkToken,
    payload: validator.createOrder
  }
};

exports.updateOne = {
  description: 'Update Order',
  notes: 'Return updated Order by id',
  tags: ['api', 'v1'],
  handler: controller.updateOne.bind(controller),
  auth: {
    strategy: 'jwt',
    scope: ['admin', 'superadmin', 'staff']
  },
  validate: {
    headers: validator.checkToken,
    params: {
      id: validator.idParam
    },
    payload: validator.updateOrder
  }
};

exports.deleteOne = {
  description: 'Delete a Order',
  notes: 'Return deleted Order by id',
  tags: ['api', 'v1'],
  handler: controller.deleteOne.bind(controller),
  auth: 'jwt',
  validate: {
    headers: validator.checkToken,
    params: {
      id: validator.idParam
    }
  }
};

exports.exportExcel = {
  description: 'Export excel',
  notes: 'Return export excel',
  tags: ['api', 'v1'],
  handler: controller.exportExcel.bind(controller),
  auth: false,
  validate: {
    query: validator.queryParams
  }
};

