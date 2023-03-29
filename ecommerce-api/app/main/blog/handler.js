'use strict';

const BlogsController = require('./controller');
const validator = require('./validator');

const controller = new BlogsController();

exports.getMany = {
  description: 'Get Blogs list',
  notes: 'Return Blogs items',
  tags: ['api', 'v1'],
  handler: controller.getMany.bind(controller),
  auth: false,
  validate: {
    query: validator.searchParams
  }
};

exports.count = {
  description: 'Count Blogs list',
  notes: 'Return a count result of Blogs items',
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
  description: 'Get a Blogs',
  notes: 'Return a Blogs by id',
  tags: ['api', 'v1'],
  handler: controller.getOne.bind(controller),
  auth: 'jwt',
  auth: false,
  validate: {
    params: {
      id: validator.idParam
    }
  }
};

exports.createOne = {
  description: 'Create a new Blogs',
  notes: 'Return created Blogs',
  tags: ['api', 'v1'],
  handler: controller.createOne.bind(controller),
  auth: {
    strategy: 'jwt',
    scope: ['admin','superadmin']
  },
  validate: {
    headers: validator.checkToken,
    payload: validator.createBlogs
  }
};

exports.updateOne = {
  description: 'Update Blogs',
  notes: 'Return updated Blogs by id',
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
    payload: validator.updateBlogs
  }
};

exports.deleteOne = {
  description: 'Delete a Blogs',
  notes: 'Return deleted Blogs by id',
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
