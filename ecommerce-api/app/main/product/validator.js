'use strict';

const Joi = require('@hapi/joi');
const { queryParams, checkToken, searchParams } = require('../../utils/validatorUtils');

exports.queryParams = queryParams;

exports.checkToken = checkToken;

exports.searchParams = searchParams;

exports.idParam = Joi.number()
  .required()
  .description('id is required');

exports.createProduct = {
  nameProduct: Joi.string().required(),
  price: Joi.number().min(0).required(),
  description: Joi.string().allow(null),
  numberAvailable: Joi.number().min(0).allow(null),
  categoryId: Joi.number().required(),
  isActive: Joi.boolean(),
  image: Joi.string().allow(null),
  properties: Joi.object().allow(null),
  gallery: Joi.array().items(Joi.string()).allow(null),
  producerId: Joi.number().allow(null).required()
};

exports.updateProduct = {
  nameProduct: Joi.string().allow(null),
  price: Joi.number().min(0).allow(null),
  description: Joi.string().allow(null),
  numberAvailable: Joi.number().min(0).allow(null),
  categoryId: Joi.number(),
  isActive: Joi.boolean(),
  image: Joi.string().allow(null),
  properties: Joi.object().allow(null),
  gallery: Joi.array().items(Joi.string()).allow(null),
  producerId: Joi.number()
};

exports.updateNumberAvailable = {
  numberAvailable: Joi.number().allow(null),
};