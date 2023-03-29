'use strict';

const Boom = require('@hapi/boom');
const Models = require('../../db/models');
const BaseServiceCRUD = require('../../base/BaseServiceCRUD');

class ProductService extends BaseServiceCRUD {
  constructor() {
    super(Models.Product, 'Product');
  }

  async getMany(query) {
    const builder = this.model.queryBuilder(query).eager('[categories, rating]').where('isActive', true);
    if (this.getSearchQuery && query.q) {
      this.getSearchQuery(builder, query.q);
    }
    return builder;
  }

  async getProductByProducer(query, id) {
    const builder = this.model.queryBuilder(query).where('producerId', id).eager('[categories, rating]').where('isActive', true);
    if (this.getSearchQuery && query.q) {
      this.getSearchQuery(builder, query.q);
    }
    return builder;
  }

  async getProductPointRating(query, categoryId, point) {
    let min, max;
    if (point === 5) {
      min = 4.50;
      max = 5;
    }
    if (point === 4) {
      min = 3.50;
      max = 4.49;
    }
    if (point === 3) {
      min = 2.50;
      max = 3.49;
    }
    if (point === 2) {
      min = 1.50;
      max = 2.49;
    }
    const builder = await Models.Rating.query().select('rating.productId').eager('products')
      .avg('rating.point as avgPoint')
      .groupBy('rating.productId')

    return builder
    
  }


  async getOne(id) {
    const result = await this.model.query().findById(id).eager('[categories, rating]').where('isActive', true);
    if (!result) {
      throw Boom.notFound(`${this.modelName} not found`);
    }
    return result;
  }

  async createOne(payload) {
    return this.model
      .query()
      .insert(payload)
      .returning('*')
      .eager('categories');
  }

  async updateOne(id, payload) {
    const result = await this.model.query().patchAndFetchById(id, payload).eager('[categories, rating]');
    if (!result) {
      throw Boom.notFound(`${this.modelName} not found`);
    }
    return result;
  }

  async updateNumberAvailable(id, payload) {
    const builder = await this.model.query().findById(id);
    if (!builder) {
      throw Boom.notFound(`${this.modelName} not found`);
    }
    const newNumberAvailable = builder.numberAvailable  - payload.numberAvailable;
    const result = await Models.Product.query().update({
      numberAvailable: newNumberAvailable
    }).where('id', id).returning('*');
    return result
  }
  getSearchQuery(builder, q) {
    builder.andWhere(function () {
      this.whereRaw('LOWER("nameProduct") LIKE \'%\' || LOWER(?) || \'%\' ', q);
    });
  }
}

module.exports = ProductService;
