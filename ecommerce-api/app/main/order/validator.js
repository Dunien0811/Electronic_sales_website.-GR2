'use strict';

const Joi = require('@hapi/joi');
const { queryParams, checkToken, searchParams } = require('../../utils/validatorUtils');
const { ORDER_STATUS } = require('../../config/type');

exports.queryParams = queryParams;

exports.checkToken = checkToken;

exports.searchParams = searchParams;

exports.idParam = Joi.number()
  .required()
  .description('id is required');

exports.createOrder = {
  fullName: Joi.string().allow(null).required(),
  address: Joi.object().allow(null).required(),
  note: Joi.string().allow(null),
  paypalCode: Joi.string().allow(null),
  phone: Joi.string().allow(null),
  totalAmount: Joi.number().min(0).required(),
  itemAmount: Joi.number().min(0).required(),
  promoTotal: Joi.number().min(0).allow(null),
  shippingTotal: Joi.number().min(0).allow(null),
  isPaid: Joi.boolean(),
  userId: Joi.number().allow(null),
  isPaymentOnline: Joi.boolean(),
  status: Joi.string().valid(ORDER_STATUS)
};

exports.updateOrder = {
  fullName: Joi.string().allow(null),
  address: Joi.object().allow(null),
  note: Joi.string().allow(null),
  paypalCode: Joi.string().allow(null),
  status: Joi.string().valid(ORDER_STATUS),
  isPaid: Joi.boolean(),
  phone: Joi.string().allow(null),
  itemAmount: Joi.number().min(0).allow(null),
  totalAmount: Joi.number().min(0).allow(null),
  promoTotal: Joi.number().min(0).allow(null),
  shippingTotal: Joi.number().min(0).allow(null),
  userId: Joi.number().allow(null),
  isPaymentOnline: Joi.boolean()
};
