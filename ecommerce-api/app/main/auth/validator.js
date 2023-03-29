'use strict';

const Joi = require('@hapi/joi');
const {
  strUsername,
  strEmail,
  strPassword,
  strPhoneNumber
} = require('../../utils/validatorUtils');

exports.validateLogin = {
  email: strEmail().required(),
  password: strPassword().required()
};

exports.validateLoginAdmin = {
  email: strEmail().required(),
  password: strPassword().required()
};

exports.validateRegister = {
  name: Joi.string().allow(null),
  address: Joi.string().allow(null),
  avatar: Joi.string().allow(null),
  phone: strPhoneNumber().allow(null),
  email: strEmail().required(),
  password: strPassword().required()
};

exports.forgotPassword = {
  email: strEmail().required()
};

exports.resetPassword = {
  resetPasswordToken: Joi.string().required(),
  password: strPassword().required()
};
