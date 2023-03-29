'use strict';

const Models = require('../../db/models');
const BaseServiceCRUD = require('../../base/BaseServiceCRUD');

class FavoriteService extends BaseServiceCRUD {
  constructor() {
    super(Models.Favorite, 'Favorite');
  }

  async createOne(productId, userId) {
    return this.model
      .query()
      .insert({
        userId: userId,
        productId: productId
      })
      .returning('*').eager('products');
  }

  async getMany(query, userId) {
    const builder = this.model.queryBuilder(query)
      .where({ userId })
      .eager('products');
    if (this.getSearchQuery && query.q) {
      this.getSearchQuery(builder, query.q);
    }
    return builder;
  }

  async getOne(id, userId) {
    const result = await this.model.query().findById(id).where({ userId }).eager('products');
    if (!result) {
      throw Boom.notFound(`${this.modelName} not found`);
    }
    return result;
  }

  async deleteOne(id, userId) {
    await this.model.query().deleteById(id).where({ userId });
    return { success: true };
  }

  getSearchQuery(builder, q) {
    builder.andWhere(function () {
      this.whereRaw('LOWER("name") LIKE \'%\' || LOWER(?) || \'%\' ', q);
    });
  }
}

module.exports = FavoriteService;
