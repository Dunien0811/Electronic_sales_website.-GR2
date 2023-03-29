'use strict';

const Joi = require('@hapi/joi');
const { queryParams, checkToken, strEmail, strPassword, strPhoneNumber, searchParams } = require('../../utils/validatorUtils');

exports.queryParams = queryParams;

exports.checkToken = checkToken;

exports.searchParams = searchParams;

exports.idParam = Joi.number()
  .required()
  .description('id is required');

exports.createUsers = {
  name: Joi.string().allow(null),
  address: Joi.string().allow(null),
  email: strEmail().required(),
  password: strPassword().required(),
  avatar: Joi.string().allow(null),
  phone: strPhoneNumber().allow(null),
  isActive: Joi.boolean(),
  isVerifyEmail: Joi.boolean(),
  roleId: Joi.number().required()
};

exports.updateUsers = {
  name: Joi.string().allow(null),
  address: Joi.string().allow(null),
  avatar: Joi.string().allow(null),
  phone: strPhoneNumber().allow(null),
  isActive: Joi.boolean(),
  isVerifyEmail: Joi.boolean(),
  roleId: Joi.number(),
};

exports.updateMe = {
  name: Joi.string().allow(null),
  address: Joi.string().allow(null),
  avatar: Joi.string().allow(null),
  phone: strPhoneNumber().allow(null)
};

exports.changePassword = {
  oldPassword: strPassword().required(),
  newPassword: strPassword().required()
};
