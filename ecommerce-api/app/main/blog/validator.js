'use strict';

const Joi = require('@hapi/joi');
const { queryParams, checkToken } = require('../../utils/validatorUtils');

exports.queryParams = queryParams;

exports.checkToken = checkToken;

exports.idParam = Joi.number()
  .required()
  .description('id is required');

exports.createBlog = {
  title: Joi.string().required(),
  content: Joi.string(),
  userId: Joi.number(),
  isActive: Joi.boolean()
};

exports.updateBlog = {
  title: Joi.string(),
  content: Joi.string(),
  userId: Joi.number(),
  isActive: Joi.boolean()
};
