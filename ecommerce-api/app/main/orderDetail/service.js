'use strict';

const Boom = require('@hapi/boom');
const Models = require('../../db/models');
const BaseServiceCRUD = require('../../base/BaseServiceCRUD');

class OrderDetailService extends BaseServiceCRUD {
  constructor() {
    super(Models.OrderDetail, 'OrderDetail');
  }

  async createOne(payload) {
    return this.model
      .query()
      .insert(payload)
      .returning('*');
  }

  async getMany(query) {
    const builder = this.model.queryBuilder(query);
    if (this.getSearchQuery && query.q) {
      this.getSearchQuery(builder, query.q);
    }
    return builder;
  }

  async getOne(id) {
    const result = await this.model.query().findById(id);
    if (!result) {
      throw Boom.notFound(`${this.modelName} not found`);
    }
    return result;
  }
  
  async getOrderDetailOfOrder(id, query) {
    const result = await this.model.queryBuilder(query).eager('product').where('orderId', id);
    if (!result) {
      throw Boom.notFound(`${this.modelName} not found`);
    }
    return result;
  }

  async deleteOne(id) {
    await this.model.query().deleteById(id);
    return { success: true };
  }

  getSearchQuery(builder, q) {
    builder.andWhere(function () {
      this.whereRaw('LOWER("fullName") LIKE \'%\' || LOWER(?) || \'%\' ', q);
    });
  }
}

module.exports = OrderDetailService;
