'use strict';

const Boom = require('@hapi/boom');
const _ = require('lodash');
const crypto = require('crypto');
const Models = require('../../db/models');
const jwt = require('../../services/jwt');
const PasswordUtils = require('../../services/password');
const MailUtils = require('../../emailService');
const config = require('../../config')
const mainWebUrl = config.webClient.url;

class AuthService {
  async login(payload) {
    try {
      const { email } = payload;
      const user = await Models.User.query()
        .findOne({
          email
        })
        .joinRelation('role')
        .select([
          'users.*',
          'users.password as hashPassword',
          'role.nameRole as scope'
        ]);
      if (!user) {
        throw Boom.notFound('This account is not exist');
      }
      const isCorrectPassword = await PasswordUtils.compare(
        payload.password,
        user.hashPassword
      );
      if (!isCorrectPassword) {
        throw Boom.unauthorized('Incorrect email or password');
      }

      const data = _.pick(user, ['email', 'id', 'scope']);
      return _.assign(
        {
          token: jwt.issue(data)
        },
        data
      );
    } catch (err) {
      throw err;
    }
  }

  async loginAdmin(payload) {
    try {
      const { email } = payload;
      const user = await Models.User.query()
        .findOne({
          email
        })
        .joinRelation('role')
        .select([
          'users.*',
          'users.password as hashPassword',
          'role.nameRole as scope'
        ]);
      if (!user) {
        throw Boom.notFound('This account is not exist');
      }
      const isCorrectPassword = await PasswordUtils.compare(
        payload.password,
        user.hashPassword
      );
      if (!isCorrectPassword) {
        throw Boom.unauthorized('Incorrect email or password');
      }
      if (user.scope === 'superadmin' || user.scope === 'admin' || user.scope === 'staff') {
        const data = _.pick(user, ['email', 'id', 'scope']);
        return await _.assign(
          {
            token: jwt.issue(data)
          },
          data
        );
      }
      throw Boom.unauthorized('The account is not authorized');
    } catch (err) {
      throw err;
    }
  }

  async register(payload) {
    try {
      const { email } = payload;
      const checkUserByEmail = await Models.User.query().findOne({
        email
      });
      if (checkUserByEmail) {
        throw Boom.badRequest('Email is exist');
      }
      const hashPassword = await PasswordUtils.hash(payload.password);

      payload.password = hashPassword;
      const memberRole = await Models.Role.query().findOne({
        nameRole: 'user'
      });
      payload.roleId = memberRole.id;

      let data = await Models.User.query()
        .insert(payload)
        .returning('*');
      data.scope = 'user';
      data = _.pick(data, ['email', 'id', 'scope']);
      return _.assign(
        {
          token: jwt.issue(data)
        },
        data
      );
    } catch (err) {
      throw err;
    }
  }

  async resetPassword(token, password) {
    const user = await Models.User.query()
      .where('resetPasswordToken', token)
      .where('resetPasswordExpire', '>', new Date().toISOString())
      .first();
    if (!user) {
      throw Boom.conflict('Your password token is incorrect ore expired');
    }
    const newHashPassword = await PasswordUtils.hash(newHashPassword);
    await Models.User.query().patchAndFetchById(user.id, {
      resetPasswordToken: null,
      resetPasswordExpire: null,
      password: newHashPassword
    });
    return {
      message: 'Your password has been reset'
    };
  }

  async forgotPassword(email) {
    const user = await Models.User.query()
      .findOne({
        email
      });
    if (!user) {
      throw Boom.conflict('Email does not exist');
    }
    const resetPasswordToken = crypto.randomBytes(64).toString('hex');
    MailUtils.sendEmailResetPassword(
      user.email,
      `${mainWebUrl}/reset-password?token=${resetPasswordToken}`
    );
    const resetPasswordExpire = new Date();
    resetPasswordExpire.setDate(resetPasswordExpire.getDate() + 1);
    await await Models.User.query().patchAndFetchById(user.id, {
      resetPasswordToken,
      resetPasswordExpire: resetPasswordExpire.toISOString()
    });
    return {
      message: 'Your reset password request has been confirmed'
    };
  }

}

module.exports = AuthService;
