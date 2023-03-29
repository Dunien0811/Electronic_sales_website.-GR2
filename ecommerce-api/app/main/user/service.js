'use strict';

const Boom = require('@hapi/boom');
const Models = require('../../db/models');
const BaseServiceCRUD = require('../../base/BaseServiceCRUD');
const _ = require('lodash');
const PasswordUtils = require('../../services/password');

class UserService extends BaseServiceCRUD {
  constructor() {
    super(Models.User, 'User');
  }

  async createOneUser(payload) {
    try {
      const { email, roleId } = payload;
      const user = await Models.User.query().findOne({ email });
      if (user) {
        throw Boom.badRequest('Email is exist');
      }
      const hashPassword = await PasswordUtils.hash(payload.password);
      payload.password = hashPassword;
      let data = await Models.User.query()
        .insert(payload)
        .returning('*').eager('role');
      return data
    } catch (err) {
      throw err;
    }
  }

  async getManyUser(query) {
    const builder = this.model.queryBuilder(query).eager('role');
    if (this.getSearchQuery && query.q) {
      this.getSearchQuery(builder, query.q);
    }
    return builder;
  }

  async getMe(query, userId) {
    const builder = this.model.queryBuilder(query).findById(userId).eager('role');
    if (this.getSearchQuery && query.q) {
      this.getSearchQuery(builder, query.q);
    }
    return builder;
  }

  async getHistoryBooking(query, userId) {
    const builder = Models.Order.queryBuilder(query).findOne({userId});
    if (this.getSearchQuery && query.q) {
      this.getSearchQuery(builder, query.q);
    }
    return builder;
  }

  async getOneUser(id) {
    const result = await this.model.query().findById(id).eager('role');
    if (!result) {
      throw Boom.notFound(`${this.modelName} not found`);
    }
    return result;
  }

  async updateOneUser(id, payload) {
    const result = await this.model.query().patchAndFetchById(id, payload).eager('role');
    if (!result) {
      throw Boom.notFound(`${this.modelName} not found`);
    }
    return result;
  }

  async updateMe(id, payload) {
    const result = await this.model.query().patchAndFetchById(id, payload).eager('role');
    if (!result) {
      throw Boom.notFound(`${this.modelName} not found`);
    }
    return result;
  }

  async cancelOrder(id) {
    const builder = await Models.Order.query().findById(id);
    if (!builder || builder.status === 'Confirm' || builder.status === 'Shipping' || builder.status === 'Complete') {
      throw Boom.badRequest(`You can't cancel with order status is Confirmed or Shipped `);
    }
    if(builder.status === 'Canceled') {
      return await Models.Order.query().deleteById(id)
    }
    const result = await Models.Order.query().patchAndFetchById(id, {status: 'Canceled'})
    return result;
  }

  async changePassword(userId, payload) {
    const user = await Models.User.query().findById(userId);
    if (!user) {
      throw Boom.notFound('USER NOT FOUND');
    }
    const isCorrectPassword = await PasswordUtils.compare(
      payload.oldPassword,
      user.password
    );
    if (!isCorrectPassword) {
      throw Boom.notFound('INCORRECT OLD PASSWORD');
    }
    const hashNewPassword = await PasswordUtils.hash(payload.newPassword);
    await Models.User.query()
      .update({ password: hashNewPassword })
      .where('id', userId);
    return { message: 'Update password is successfully' };
  }

  getSearchQuery(builder, q) {
    builder.andWhere(function () {
      this.whereRaw('LOWER(email) LIKE \'%\' || LOWER(?) || \'%\' ', q);
      this.orWhereRaw('LOWER(name) LIKE \'%\' || LOWER(?) || \'%\' ', q);
    });
  }
}

module.exports = UserService;
