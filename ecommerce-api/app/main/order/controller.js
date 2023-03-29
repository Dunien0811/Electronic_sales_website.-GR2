'use strict';

const BaseControllerCRUD = require('../../base/BaseControllerCRUD');
const OrderService = require('./service');

class OrderController extends BaseControllerCRUD {
  constructor() {
    super(new OrderService());
  }

  async createOne(request) {
    try {
      const { payload } = request;
      return await this.service.createOne(payload);
    } catch (err) {
      throw err;
    }
  };

  async getMany(request) {
    try {
      return await this.service.getMany(request.query);
    } catch (err) {
      throw err;
    }
  };

  async getOne(request) {
    try {
      const {
        id
      } = request.params;
      return await this.service.getOne(id);
    } catch (err) {
      throw err;
    }
  };

  async deleteOne(request) {
    try {
      const {
        id
      } = request.params;
      return await this.service.deleteOne(id);
    } catch (err) {
      throw err;
    }
  };
}

module.exports = OrderController;
