'use strict';

const Joi = require('@hapi/joi');
const { queryParams, checkToken, searchParams } = require('../../utils/validatorUtils');

exports.queryParams = queryParams;

exports.checkToken = checkToken;

exports.searchParams = searchParams;

exports.idParam = Joi.number()
  .required()
  .description('id is required');
