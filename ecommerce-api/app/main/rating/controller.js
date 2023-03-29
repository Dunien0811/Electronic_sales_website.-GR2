'use strict';

const BaseControllerCRUD = require('../../base/BaseControllerCRUD');
const RatingService = require('./service');

class RatingController extends BaseControllerCRUD {
  constructor() {
    super(new RatingService());
  }

  async createOne(request) {
    try {
      const { productId } = request.params;
      const userId = request.auth.credentials.id;
      const { payload } = request;
      return await this.service.createOne(productId, userId, payload);
    } catch (err) {
      throw err;
    }
  };

  async getMany(request) {
    const { productId } = request.params;
    try {
      return await this.service.getMany(request.query, productId);
    } catch (err) {
      throw err;
    }
  };
  async getAll(request) {
    try {
      return await this.service.getAll(request.query);
    } catch (err) {
      throw err;
    }
  };

  async count(request) {
    try {
      const { productId } = request.params;
      const userId = request.auth.credentials.id;
      return await this.service.count(userId, productId);
    } catch (err) {
      throw err;
    }
  };

  async updateOne(request) {
    try {
      const { id } = request.params;
      const { payload } = request.payload;
      const userId = request.auth.credentials.id;
      return await this.service.updateOne(id, payload, userId);
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

module.exports = RatingController;
