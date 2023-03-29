'use strict';

const Joi = require('@hapi/joi');
const { queryParams, checkToken, searchParams } = require('../../utils/validatorUtils');

exports.queryParams = queryParams;
exports.searchParams = searchParams;

exports.checkToken = checkToken;

exports.idParam = Joi.number()
  .required()
  .description('id is required');

exports.createRating = {
  point: Joi.number().min(0).max(5).required(),
  content: Joi.string().allow(null)
};

exports.updateRating = {
  point: Joi.number().min(0).max(5).allow(null),
  content: Joi.string().allow(null)
};
