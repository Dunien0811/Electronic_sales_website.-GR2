'use strict';

const ProducerController = require('./controller');
const validator = require('./validator');

const controller = new ProducerController();

exports.getMany = {
  description: 'Get Producer list',
  notes: 'Return Producer items',
  tags: ['api', 'v1'],
  handler: controller.getMany.bind(controller),
  auth: false,
  validate: {
    headers: validator.checkToken,
    query: validator.searchParams
  }
};

exports.count = {
  description: 'Count Producer list',
  notes: 'Return a count result of Producer items',
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
  description: 'Get a Producer',
  notes: 'Return a Producer by id',
  tags: ['api', 'v1'],
  handler: controller.getOne.bind(controller),
  auth: false,
  validate: {
    headers: validator.checkToken,
    params: {
      id: validator.idParam
    }
  }
};

exports.getManyByCategoryId = {
  description: 'Get  Producer by category',
  notes: 'Return Producer by category',
  tags: ['api', 'v1'],
  handler: controller.getManyByCategoryId.bind(controller),
  auth: false,
  validate: {
    headers: validator.checkToken,
    params: {
      id: validator.idParam
    }
  }
};

exports.createOne = {
  description: 'Create a new Producer',
  notes: 'Return created Producer',
  tags: ['api', 'v1'],
  handler: controller.createOne.bind(controller),
  auth: {
    strategy: 'jwt',
    scope: ['admin', 'superadmin']
  },
  validate: {
    headers: validator.checkToken,
    payload: validator.createProducer
  }
};

exports.updateOne = {
  description: 'Update Producer',
  notes: 'Return updated Producer by id',
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
    payload: validator.updateProducer
  }
};

exports.deleteOne = {
  description: 'Delete a Producer',
  notes: 'Return deleted Producer by id',
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