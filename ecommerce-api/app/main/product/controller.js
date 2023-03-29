'use strict';

const BaseControllerCRUD = require('../../base/BaseControllerCRUD');
const ProductService = require('./service');

class ProductController extends BaseControllerCRUD {
  constructor() {
    super(new ProductService());
  }

  async getProductByProducer(request) {
    try {
      const { id } = request.params;
      return await this.service.getProductByProducer(request.query, id);
    } catch (err) {
      throw err;
    }
  };
  async getProductPointRating(request) {
    try {
      const { categoryId, point } = request.params;
      return await this.service.getProductPointRating(request.query, categoryId, point);
    } catch (err) {
      throw err;
    }
  };
  async updateNumberAvailable(request) {
    try {
      const { id } = request.params;
      return await this.service.updateNumberAvailable(id, request.payload);
    } catch (err) {
      throw err;
    }
  };
}

module.exports = ProductController;
