'use strict';

const Joi = require('@hapi/joi');
const { queryParams, searchParams, checkToken } = require('../../utils/validatorUtils');
const { DISCOUNT_TRIGGER, DISCOUNT_TYPE } = require('./../../config/type')

exports.queryParams = queryParams;

exports.searchParams = searchParams;

exports.checkToken = checkToken;

exports.idParam = Joi.number()
  .required()
  .description('id is required');

exports.createDiscount = {
  nameDiscount: Joi.string(),
  trigger: Joi.string().valid(DISCOUNT_TRIGGER).required(),
  code: Joi.string(),
  totalToReach: Joi.number(),
  type: Joi.string().valid(DISCOUNT_TYPE).required(),
  rate: Joi.number().min(0).max(100),
  amount: Joi.number().min(0).allow(null),
  maxNumberOfUsages: Joi.number().min(0),
  numberOfUsages: Joi.number().min(0),
  shippingCost: Joi.number().allow(0),
  startTime: Joi.date().iso().required(),
  endTime: Joi.date().iso().greater(Joi.ref('startTime')).required(),
  isActive: Joi.boolean(),
  productId: Joi.array().items(Joi.number()).allow(null)
};

exports.updateDiscount = {
  nameDiscount: Joi.string(),
  trigger: Joi.string().valid(DISCOUNT_TRIGGER),
  code: Joi.string(),
  totalToReach: Joi.number(),
  type: Joi.string().valid(DISCOUNT_TYPE),
  rate: Joi.number().min(0).max(100),
  amount: Joi.number().min(0).allow(null),
  maxNumberOfUsages: Joi.number().min(0),
  numberOfUsages: Joi.number().min(0),
  shippingCost: Joi.number().allow(0),
  startTime: Joi.date().iso(),
  endTime: Joi.date().iso().greater(Joi.ref('startTime')),
  isActive: Joi.boolean(),
  productId: Joi.array().items(Joi.number())
};
