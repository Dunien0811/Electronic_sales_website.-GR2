'use strict';

const OrderDetailController = require('./controller');
const validator = require('./validator');

const controller = new OrderDetailController();

exports.getMany = {
  description: 'Get OrderDetail list',
  notes: 'Return OrderDetail items',
  tags: ['api', 'v1'],
  handler: controller.getMany.bind(controller),
  auth: 'jwt',
  validate: {
    query: validator.searchParams
  }
};

exports.count = {
  description: 'Count OrderDetail list',
  notes: 'Return a count result of OrderDetail items',
  tags: ['api', 'v1'],
  handler: controller.count.bind(controller),
  auth: {
    strategy: 'jwt',
    scope: ['admin', 'superadmin']
  },
  validate: {
    headers: validator.checkToken
  }
};

exports.getOne = {
  description: 'Get a OrderDetail',
  notes: 'Return a OrderDetail by id',
  tags: ['api', 'v1'],
  handler: controller.getOne.bind(controller),
  auth: 'jwt',
  validate: {
    params: {
      id: validator.idParam
    }
  }
};

exports.getOrderDetailOfOrder = {
  description: 'Get a OrderDetail',
  notes: 'Return a OrderDetail by id',
  tags: ['api', 'v1'],
  handler: controller.getOrderDetailOfOrder.bind(controller),
  auth: 'jwt',
  validate: {
    query: validator.searchParams,
    params: {
      id: validator.idParam
    }
  }
};

exports.createOne = {
  description: 'Create a new OrderDetail',
  notes: 'Return created OrderDetail',
  tags: ['api', 'v1'],
  handler: controller.createOne.bind(controller),
  auth: 'jwt',
  validate: {
    headers: validator.checkToken,
    payload: validator.createOrderDetail
  }
};

exports.updateOne = {
  description: 'Update OrderDetail',
  notes: 'Return updated OrderDetail by id',
  tags: ['api', 'v1'],
  handler: controller.updateOne.bind(controller),
  auth: {
    strategy: 'jwt',
    scope: ['admin', 'superadmin']
  },
  validate: {
    headers: validator.checkToken,
    params: {
      id: validator.idParam
    },
    payload: validator.updateOrderDetail
  }
};

exports.deleteOne = {
  description: 'Delete a OrderDetail',
  notes: 'Return deleted OrderDetail by id',
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
