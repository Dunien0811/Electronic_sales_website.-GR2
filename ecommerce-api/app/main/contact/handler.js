'use strict';

const ContactController = require('./controller');
const validator = require('./validator');

const controller = new ContactController();

exports.getMany = {
  description: 'Get Contact list',
  notes: 'Return Contact items',
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
  description: 'Count Contact list',
  notes: 'Return a count result of Contact items',
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
  description: 'Get a Contact',
  notes: 'Return a Contact by id',
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
  description: 'Create a new Contact',
  notes: 'Return created Contact',
  tags: ['api', 'v1'],
  handler: controller.createOne.bind(controller),
  auth: false,
  validate: {
    payload: validator.createContact
  }
};

exports.updateOne = {
  description: 'Update Contact',
  notes: 'Return updated Contact by id',
  tags: ['api', 'v1'],
  handler: controller.updateOne.bind(controller),
  auth: false,
  validate: {
    params: {
      id: validator.idParam
    },
    payload: validator.updateContact
  }
};

exports.deleteOne = {
  description: 'Delete a Contact',
  notes: 'Return deleted Contact by id',
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

