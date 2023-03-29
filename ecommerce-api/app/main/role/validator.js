'use strict';

const Joi = require('@hapi/joi');
const {
  idNumber,
  queryParams,
  objectGeoLocation,
  checkToken,
  searchParams
} = require('../../utils/validatorUtils');

exports.queryParams = queryParams;

exports.searchParams = searchParams;

exports.checkToken = checkToken;

exports.idParam = Joi.string()
  .required()
  .description('id is required');

exports.createRole = {
  nameRole: Joi.string().required(),
  description: Joi.string().allow(null),
  isActive: Joi.boolean()
};

exports.updateRole = {
  nameRole: Joi.string().allow(null),
  description: Joi.string().allow(null),
  isActive: Joi.boolean()
};

exports.activate = Joi.boolean().required();
