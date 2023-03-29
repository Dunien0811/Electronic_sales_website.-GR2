'use strict';

const CategoryController = require('./controller');
const validator = require('./validator');

const controller = new CategoryController();

exports.getMany = {
  description: 'Get Category list',
  notes: 'Return Category items',
  tags: ['api', 'v1'],
  handler: controller.getMany.bind(controller),
  auth: false,
  validate: {
    query: validator.searchParams
  }
};
exports.getManyProductOfCategory = {
  description: 'Get getManyProductOfCategory list',
  notes: 'Return getManyProductOfCategory items',
  tags: ['api', 'v1'],
  handler: controller.getManyProductOfCategory.bind(controller),
  auth: false,
  validate: {
    query: validator.searchParams
  }
};

exports.count = {
  description: 'Count Category list',
  notes: 'Return a count result of Category items',
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
  description: 'Get a Category',
  notes: 'Return a Category by id',
  tags: ['api', 'v1'],
  handler: controller.getOne.bind(controller),
  auth: false,
  validate: {
    params: {
      id: validator.idParam
    }
  }
};

exports.createOne = {
  description: 'Create a new Category',
  notes: 'Return created Category',
  tags: ['api', 'v1'],
  handler: controller.createOne.bind(controller),
  auth: {
    strategy: 'jwt',
    scope: ['admin','superadmin']
  },
  validate: {
    headers: validator.checkToken,
    payload: validator.createCategory
  }
};

exports.updateOne = {
  description: 'Update Category',
  notes: 'Return updated Category by id',
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
    payload: validator.updateCategory
  }
};

exports.deleteOne = {
  description: 'Delete a Category',
  notes: 'Return deleted Category by id',
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

