'use strict';

const RoleController = require('./controller');
const validator = require('./validator');

const controller = new RoleController();

exports.getMany = {
  description: 'Get Role list',
  notes: 'Return Role items',
  tags: ['api', 'v1'],
  handler: controller.getMany.bind(controller),
  auth: {
    strategy: 'jwt',
    scope: ['admin', 'superadmin']
  },
  validate: {
    headers: validator.checkToken,
    query: validator.searchParams
  }
};

exports.count = {
  description: 'Count Role list',
  notes: 'Return a count result of Role items',
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
  description: 'Get a Role',
  notes: 'Return a Role by id',
  tags: ['api', 'v1'],
  handler: controller.getOne.bind(controller),
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

exports.createOne = {
  description: 'Create a new Role',
  notes: 'Return created Role',
  tags: ['api', 'v1'],
  handler: controller.createOne.bind(controller),
  auth: {
    strategy: 'jwt',
    scope: ['admin', 'superadmin']
  },
  validate: {
    headers: validator.checkToken,
    payload: validator.createRole
  }
};

exports.updateOne = {
  description: 'Update Role',
  notes: 'Return updated Role by id',
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
    payload: validator.updateRole
  }
};

exports.deleteOne = {
  description: 'Delete a Role',
  notes: 'Return deleted Role by id',
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
