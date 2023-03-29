'use strict';

const Boom = require('@hapi/boom');
const Models = require('../../db/models');
const BaseServiceCRUD = require('../../base/BaseServiceCRUD');

class RatingService extends BaseServiceCRUD {
  constructor() {
    super(Models.Rating, 'Rating');
  }

  async createOne(productId, userId, payload) {
    payload.userId = userId;
    payload.productId = productId;
    return this.model
      .query()
      .insert(payload)
      .where()
      .returning('*').eager('user');
  }

  async getMany(query, productId) {
    const builder = this.model.queryBuilder(query)
      .where({ productId }).eager('user');
    if (this.getSearchQuery && query.q) {
      this.getSearchQuery(builder, query.q);
    }
    return builder;
  }
  async getAll(query) {
    const builder = this.model.queryBuilder(query).eager('[products, user]')
    if (this.getSearchQuery && query.q) {
      this.getSearchQuery(builder, query.q);
    }
    return builder;
  }

  getSearchQuery(builder, q) {
    builder.innerJoin('users', 'rating.userId', '=', 'users.id')
    .innerJoin('product', 'rating.productId', '=', 'product.id')
    .whereRaw('LOWER("email") LIKE \'%\' || LOWER(?) || \'%\' ', q)
    .orWhereRaw('LOWER("nameProduct") LIKE \'%\' || LOWER(?) || \'%\' ', q)
  }
}

module.exports = RatingService;
