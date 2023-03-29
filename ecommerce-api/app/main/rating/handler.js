'use strict';

const RatingController = require('./controller');
const validator = require('./validator');

const controller = new RatingController();

exports.getMany = {
  description: 'Get Rating list',
  notes: 'Return Rating items',
  tags: ['api', 'v1'],
  handler: controller.getMany.bind(controller),
  auth: false,
  // validate: {
  //   query: validator.searchParams
  // }
};
exports.getAll = {
  description: 'Get Rating list',
  notes: 'Return Rating items',
  tags: ['api', 'v1'],
  handler: controller.getAll.bind(controller),
  auth: false,
  validate: {
    query: validator.searchParams
  }
};

exports.count = {
  description: 'Count Rating list',
  notes: 'Return a count result of Rating items',
  tags: ['api', 'v1'],
  handler: controller.count.bind(controller),
  auth: 'jwt',
  validate: {
    headers: validator.checkToken
  }
};

exports.getOne = {
  description: 'Get a Rating',
  notes: 'Return a Rating by id',
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
  description: 'Create a new Rating',
  notes: 'Return created Rating',
  tags: ['api', 'v1'],
  handler: controller.createOne.bind(controller),
  auth: {
    strategy: 'jwt'
  },
  validate: {
    headers: validator.checkToken,
    payload: validator.createRating
  }
};

exports.updateOne = {
  description: 'Update Rating',
  notes: 'Return updated Rating by id',
  tags: ['api', 'v1'],
  handler: controller.updateOne.bind(controller),
  auth: {
    strategy: 'jwt'
  },
  validate: {
    headers: validator.checkToken,
    params: {
      id: validator.idParam
    },
    payload: validator.updateRating
  }
};

exports.deleteOne = {
  description: 'Delete a Rating',
  notes: 'Return deleted Rating by id',
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
