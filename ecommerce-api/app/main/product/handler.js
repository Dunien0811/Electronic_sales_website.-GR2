'use strict';

const ProductController = require('./controller');
const validator = require('./validator');

const controller = new ProductController();

exports.getMany = {
  description: 'Get Product list',
  notes: 'Return Product items',
  tags: ['api', 'v1'],
  handler: controller.getMany.bind(controller),
  auth: false,
  validate: {
    query: validator.searchParams
  }
};

exports.getProductByProducer = {
  description: 'Get Product list by producer',
  notes: 'Return Product items by producer',
  tags: ['api', 'v1'],
  handler: controller.getProductByProducer.bind(controller),
  auth: false,
  validate: {
    query: validator.searchParams
  }
};

exports.count = {
  description: 'Count Product list',
  notes: 'Return a count result of Product items',
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
  description: 'Get a Product',
  notes: 'Return a Product by id',
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

exports.getProductPointRating = {
  description: 'Get a Product',
  notes: 'Return a Product by id',
  tags: ['api', 'v1'],
  handler: controller.getProductPointRating.bind(controller),
  auth: 'jwt',
  auth: false,
  validate: {
    query: validator.searchParams
  }
};

exports.createOne = {
  description: 'Create a new Product',
  notes: 'Return created Product',
  tags: ['api', 'v1'],
  handler: controller.createOne.bind(controller),
  auth: {
    strategy: 'jwt',
    scope: ['admin','superadmin']
  },
  validate: {
    headers: validator.checkToken,
    payload: validator.createProduct
  }
};

exports.updateOne = {
  description: 'Update Product',
  notes: 'Return updated Product by id',
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
    payload: validator.updateProduct
  }
};

exports.updateNumberAvailable = {
  description: 'Update Product',
  notes: 'Return updated Product by id',
  tags: ['api', 'v1'],
  handler: controller.updateNumberAvailable.bind(controller),
  auth: 'jwt',
  validate: {
    headers: validator.checkToken,
    params: {
      id: validator.idParam
    },
    payload: validator.updateNumberAvailable
  }
};

exports.deleteOne = {
  description: 'Delete a Product',
  notes: 'Return deleted Product by id',
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

