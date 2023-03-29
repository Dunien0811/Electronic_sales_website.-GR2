'use strict';

const UsersController = require('./controller');
const validator = require('./validator');

const controller = new UsersController();

exports.getManyUser = {
  description: 'Get Users list',
  notes: 'Return Users items',
  tags: ['api', 'v1'],
  handler: controller.getManyUser.bind(controller),
  auth: {
    strategy: 'jwt',
    scope: ['admin', 'superadmin']
  },
  validate: {
    headers: validator.checkToken,
    query: validator.searchParams
  }
};

exports.getMe = {
  description: 'Get Users list',
  notes: 'Return Users items',
  tags: ['api', 'v1'],
  handler: controller.getMe.bind(controller),
  auth: 'jwt',
  validate: {
    headers: validator.checkToken,
    query: validator.searchParams
  }
};

exports.getHistoryBooking = {
  description: 'Get getHistoryBooking list',
  notes: 'Return getHistoryBooking items',
  tags: ['api', 'v1'],
  handler: controller.getHistoryBooking.bind(controller),
  auth: 'jwt',
  validate: {
    headers: validator.checkToken,
    query: validator.searchParams
  }
};

exports.updateMe = {
  description: 'update me',
  notes: 'Return update me',
  tags: ['api', 'v1'],
  handler: controller.updateMe.bind(controller),
  auth: 'jwt',
  validate: {
    headers: validator.checkToken,
    query: validator.searchParams
  }
};

exports.changePassword = {
  description: 'change Password me',
  notes: 'Return change Password me',
  tags: ['api', 'v1'],
  handler: controller.changePassword.bind(controller),
  auth: 'jwt',
  validate: {
    headers: validator.checkToken,
    query: validator.searchParams
  }
};

exports.count = {
  description: 'Count Users list',
  notes: 'Return a count result of Users items',
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

exports.getOneUser = {
  description: 'Get a Users',
  notes: 'Return a Users by id',
  tags: ['api', 'v1'],
  handler: controller.getOneUser.bind(controller),
  auth: 'jwt',
  auth: {
    strategy: 'jwt',
    scope: ['admin', 'superadmin']
  },
  validate: {
    params: {
      id: validator.idParam
    }
  }
};

exports.createOneUser = {
  description: 'Create a new Users',
  notes: 'Return created Users',
  tags: ['api', 'v1'],
  handler: controller.createOneUser.bind(controller),
  auth: {
    strategy: 'jwt',
    scope: ['admin','superadmin']
  },
  validate: {
    headers: validator.checkToken,
    payload: validator.createUsers
  }
};

exports.updateOneUser = {
  description: 'Update Users',
  notes: 'Return updated Users by id',
  tags: ['api', 'v1'],
  handler: controller.updateOneUser.bind(controller),
  auth: {
    strategy: 'jwt',
    scope: ['admin', 'superadmin']
  },
  validate: {
    headers: validator.checkToken,
    params: {
      id: validator.idParam
    },
    payload: validator.updateUsers
  }
};

exports.cancelOrder = {
  description: 'Update Users',
  notes: 'Return updated Users by id',
  tags: ['api', 'v1'],
  handler: controller.cancelOrder.bind(controller),
  auth: {
    strategy: 'jwt'
  },
  validate: {
    headers: validator.checkToken,
    params: {
      id: validator.idParam
    }
  }
};

exports.deleteOne = {
  description: 'Delete a Users',
  notes: 'Return deleted Users by id',
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

