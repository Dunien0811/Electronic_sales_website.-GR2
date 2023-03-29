'use strict';

const FavoriteController = require('./controller');
const validator = require('./validator');

const controller = new FavoriteController();

exports.getMany = {
  description: 'Get Favorite list',
  notes: 'Return Favorite items',
  tags: ['api', 'v1'],
  handler: controller.getMany.bind(controller),
  auth: {
    strategy: 'jwt'
  },
  validate: {
    query: validator.searchParams
  }
};

exports.getOne = {
  description: 'Get a Favorite',
  notes: 'Return a Favorite by id',
  tags: ['api', 'v1'],
  handler: controller.getOne.bind(controller),
  auth: {
    strategy: 'jwt'
  },
  validate: {
    params: {
      id: validator.idParam
    }
  }
};

exports.createOne = {
  description: 'Create a new Favorite',
  notes: 'Return created Favorite',
  tags: ['api', 'v1'],
  handler: controller.createOne.bind(controller),
  auth: 'jwt'
};

exports.deleteOne = {
  description: 'Delete a Favorite',
  notes: 'Return deleted Favorite by id',
  tags: ['api', 'v1'],
  handler: controller.deleteOne.bind(controller),
  auth: {
    strategy: 'jwt'
  },
  validate: {
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

