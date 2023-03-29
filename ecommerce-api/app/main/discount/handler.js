'use strict';

const DiscountController = require('./controller');
const validator = require('./validator');

const controller = new DiscountController();

exports.getMany = {
  description: 'Get Discount list',
  notes: 'Return Discount items',
  tags: ['api', 'v1'],
  handler: controller.getMany.bind(controller),
  auth: {
    strategy: 'jwt',
    scope: ['admin','superadmin']
  },
  validate: {
    query: validator.searchParams
  }
};

exports.count = {
  description: 'Count Discount list',
  notes: 'Return a count result of Discount items',
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
  description: 'Get a Discount',
  notes: 'Return a Discount by id',
  tags: ['api', 'v1'],
  handler: controller.getOne.bind(controller),
  auth: 'jwt',
  auth: {
    strategy: 'jwt',
    scope: ['admin','superadmin']
  },
  validate: {
    params: {
      id: validator.idParam
    }
  }
};

exports.createOne = {
  description: 'Create a new Discount',
  notes: 'Return created Discount',
  tags: ['api', 'v1'],
  handler: controller.createOne.bind(controller),
  auth: {
    strategy: 'jwt',
    scope: ['admin','superadmin']
  },
  validate: {
    headers: validator.checkToken,
    payload: validator.createDiscount
  }
};

exports.updateOne = {
  description: 'Update Discount',
  notes: 'Return updated Discount by id',
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
    payload: validator.updateDiscount
  }
};

exports.deleteOne = {
  description: 'Delete a Discount',
  notes: 'Return deleted Discount by id',
  tags: ['api', 'v1'],
  handler: controller.deleteOne.bind(controller),
  auth: {
    strategy: 'jwt',
    scope: ['admin', 'superadmin']
  },
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
