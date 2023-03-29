'use strict';

const Joi = require('@hapi/joi');
const { queryParams, checkToken, searchParams } = require('../../utils/validatorUtils');

exports.queryParams = queryParams;

exports.checkToken = checkToken;

exports.searchParams = searchParams;

exports.idParam = Joi.number()
  .required()
  .description('id is required');

exports.getReportIncome = {
  startTime: Joi.date().iso(),
  endTime: Joi.date().iso().greater(Joi.ref('startTime')),
};
exports.getReportProducts = {
  startTime: Joi.date().iso(),
  endTime: Joi.date().iso().greater(Joi.ref('startTime')),
};

