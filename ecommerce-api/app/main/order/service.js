'use strict';

const Boom = require('@hapi/boom');
const Models = require('../../db/models');
const BaseServiceCRUD = require('../../base/BaseServiceCRUD');
const MailUtils = require('../../emailService');

class OrderService extends BaseServiceCRUD {
  constructor() {
    super(Models.Order, 'Order');
  }

  async createOne(payload) {
    const result = await this.model
      .query()
      .insert(payload)
      .returning('*');
    if(!result){
      throw Boom.badRequest('Error')
    }
    const id = payload.userId;
    const user = await Models.User.query().findById(id);
    if (!user) {
      throw Boom.notFound('user not found')
    }
    MailUtils.sendEmailCreateOrderEmail(user.email)
    return result;
  }

  async getMany(query) {
    const builder = this.model.queryBuilder(query).eager('orderDetails');
    if (this.getSearchQuery && query.q) {
      this.getSearchQuery(builder, query.q);
    }
    return builder;
  }

  async getOne(id) {
    const result = await this.model.query().findById(id).eager('orderDetails');
    if (!result) {
      throw Boom.notFound(`${this.modelName} not found`);
    }
    return result;
  }

  async updateOne(id, payload) {
    const result = await this.model.query().patchAndFetchById(id, payload);
    if (!result) {
      throw Boom.notFound(`${this.modelName} not found`);
    }
    if (payload.status === 'Confirm') {
       MailUtils.sendEmailConfirmOrderEmail(id)
    }
    if (payload.status === 'Shipping') {
      MailUtils.sendEmailShippedOrder(id)
    }
    if (payload.status === 'Complete') {
      MailUtils.sendEmailCompleteOrderEmail(id);
    }
    return result;
  }

  getSearchQuery(builder, q) {
    builder.andWhere(function () {
      this.whereRaw('LOWER("fullName") LIKE \'%\' || LOWER(?) || \'%\' ', q);
    });
  }
}

module.exports = OrderService;
