'use strict';

const Joi = require('@hapi/joi');
const { queryParams, checkToken, searchParams } = require('../../utils/validatorUtils');

exports.queryParams = queryParams;

exports.checkToken = checkToken;

exports.searchParams = {
  ...searchParams,
  minPrice: Joi.number().min(0),
  maxPrice: Joi.number()
};

exports.idParam = Joi.number()
  .required()
  .description('id is required');

exports.createCategory = {
  nameCategory: Joi.string().required(),
  description: Joi.string().allow(null),
  image: Joi.string().allow(null),
  isActive: Joi.boolean()
};

exports.updateCategory = {
  nameCategory: Joi.string().required().allow(null),
  description: Joi.string().allow(null),
  image: Joi.string().allow(null),
  isActive: Joi.boolean()
};
