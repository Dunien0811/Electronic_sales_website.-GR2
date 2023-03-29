'use strict';

const Joi = require('@hapi/joi');

function strEmail() {
  return Joi.string().email().lowercase({ force: true });
}

function strPhoneNumber() {
  return Joi.string().min(8);
}

function strPassword() {
  return Joi.string().min(6).max(32);
}

function strGender() {
  return Joi.string().valid(['Male', 'Female', 'Others']);
}

function strLanguage() {
  return Joi.string().valid(['en', 'vi']);
}

function ratingValue() {
  return Joi.number()
    .integer()
    .min(1)
    .max(5);
}

function idNumber() {
  return Joi.number()
    .integer()
    .min(0);
}

const queryParams = {
  limit: Joi.number()
    .min(1)
    .max(100)
    .default(10),
  offset: Joi.number().default(0),
  orderBy: Joi.string(),
  filter: Joi.object(),
  fields: Joi.array()
};

const searchParams = {
  limit: Joi.number()
    .min(1)
    .max(100)
    .default(10),
  offset: Joi.number().default(0),
  orderBy: Joi.string(),
  filter: Joi.object(),
  fields: Joi.array(),
  q: Joi.string()
};

const checkToken = Joi.object({
  Authorization: Joi.string()
}).options({ allowUnknown: true });

module.exports = {
  strPhoneNumber,
  strPassword,
  strGender,
  strLanguage,
  strEmail,
  ratingValue,
  idNumber,
  queryParams,
  searchParams,
  checkToken
};
