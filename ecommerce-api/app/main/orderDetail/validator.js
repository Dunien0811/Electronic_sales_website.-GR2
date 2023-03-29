'use strict';

const Joi = require('@hapi/joi');
const { queryParams, checkToken, searchParams } = require('../../utils/validatorUtils');

exports.queryParams = queryParams;
exports.searchParams = searchParams;

exports.checkToken = checkToken;

exports.idParam = Joi.number()
  .required()
  .description('id is required');

exports.createOrderDetail = {
  quantity: Joi.number().required(),
  price: Joi.number().min(0).required(),
  orderId: Joi.number().required(),
  productId: Joi.number().required(),
  nameProduct: Joi.string()
};

exports.updateOrderDetail = {
  quantity: Joi.number(),
  price: Joi.number().min(0),
  orderId: Joi.number(),
  productId: Joi.number(),
  nameProduct: Joi.string()
};
