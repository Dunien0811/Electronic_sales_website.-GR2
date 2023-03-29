'use strict';

const BaseControllerCRUD = require('../../base/BaseControllerCRUD');
const FavoriteService = require('./service');

class FavoriteController extends BaseControllerCRUD {
  constructor() {
    super(new FavoriteService());
  }
  async createOne(request) {
    try {
      const { productId } = request.params;
      const userId = request.auth.credentials.id;
      return await this.service.createOne(productId, userId);
    } catch (err) {
      throw err;
    }
  };

  async getMany(request) {
    const userId = request.auth.credentials.id;
    try {
      return await this.service.getMany(request.query, userId);
    } catch (err) {
      throw err;
    }
  };

  async getOne(request) {
    try {
      const {
        id
      } = request.params;
      const userId = request.auth.credentials.id;
      return await this.service.getOne(id, userId);
    } catch (err) {
      throw err;
    }
  };

  async deleteOne(request) {
    try {
      const {
        id
      } = request.params;
      const userId = request.auth.credentials.id;
      return await this.service.deleteOne(id, userId);
    } catch (err) {
      throw err;
    }
  };
}

module.exports = FavoriteController;
