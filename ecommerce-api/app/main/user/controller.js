'use strict';

const BaseControllerCRUD = require('../../base/BaseControllerCRUD');
const UserService = require('./service');

class UserController extends BaseControllerCRUD {
  constructor() {
    super(new UserService());
  }

  async createOneUser(request) {
    try {
      const {
        payload
      } = request;
      return await this.service.createOneUser(payload);
    } catch (err) {
      throw err;
    }
  };

  async getManyUser(request) {
    try {
      return await this.service.getManyUser(request.query);
    } catch (err) {
      throw err;
    }
  };

  async getMe(request) {
    try {
      const userId = request.auth.credentials.id;
      return await this.service.getMe(request.query, userId);
    } catch (err) {
      throw err;
    }
  };

  async getHistoryBooking(request) {
    try {
      const userId = request.auth.credentials.id;
      return await this.service.getHistoryBooking(request.query, userId);
    } catch (err) {
      throw err;
    }
  };

  async updateMe(request) {
    try {
      const userId = request.auth.credentials.id;
      return await this.service.updateMe(userId, request.payload);
    } catch (err) {
      throw err;
    }
  };

  async cancelOrder(request) {
    try {
      const {
        id
      } = request.params;
      return await this.service.cancelOrder(id);
    } catch (err) {
      throw err;
    }
  };

  async changePassword(request) {
    try {
      const userId = request.auth.credentials.id;
      return await this.service.changePassword(userId, request.payload);
    } catch (err) {
      throw err;
    }
  };

  async getOneUser(request) {
    try {
      const {
        id
      } = request.params;
      return await this.service.getOneUser(id);
    } catch (err) {
      throw err;
    }
  };

  async updateOneUser(request) {
    try {
      const {
        params,
        payload
      } = request;
      const {
        id
      } = params;
      return await this.service.updateOneUser(id, payload);
    } catch (err) {
      throw err;
    }
  };

}

module.exports = UserController;
