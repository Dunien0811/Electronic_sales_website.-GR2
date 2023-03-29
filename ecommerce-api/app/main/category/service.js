'use strict';

const Boom = require('@hapi/boom');
const Models = require('../../db/models');
const BaseServiceCRUD = require('../../base/BaseServiceCRUD');

class CategoryService extends BaseServiceCRUD {
  constructor() {
    super(Models.Category, 'Category');
  }

  async getManyProductOfCategory(query, id) {
    const { minPrice, maxPrice } = query
    const builder = Models.Product.queryBuilder(query).eager('[categories, rating]')
      .where('isActive', true)
      .where('categoryId', id)
    if (minPrice && maxPrice) {
      builder.whereBetween('price', [minPrice, maxPrice]);
    }
    if (this.getSearchQuery && query.q) {
      this.getSearchQuery(builder, query.q);
    }
    return builder;
  }

  getSearchQuery(builder, q) {
    builder.andWhere(function () {
      this.whereRaw('LOWER("nameCategory") LIKE \'%\' || LOWER(?) || \'%\' ', q);
    });
  }
}

module.exports = CategoryService;
