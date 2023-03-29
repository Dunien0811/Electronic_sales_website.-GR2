'use strict';

const Joi = require('@hapi/joi');
const {
  idNumber,
  queryParams,
  objectGeoLocation,
  checkToken,
  searchParams, strEmail
} = require('../../utils/validatorUtils');

exports.queryParams = queryParams;

exports.searchParams = searchParams;

exports.checkToken = checkToken;

exports.idParam = Joi.string()
  .required()
  .description('id is required');

exports.createContact = {
  name: Joi.string().required(),
  email: strEmail().required(),
  subject: Joi.string().allow(null),
  message: Joi.string().allow(null)
};

exports.updateContact = {
  name: Joi.string().allow(null),
  email: strEmail().allow(null),
  subject: Joi.string().allow(null),
  message: Joi.string().allow(null),
};

exports.activate = Joi.boolean().required();
