'use strict';

const Boom = require('@hapi/boom');
const pcVN = require('pc-vn')

exports.getMany = async (query) => {
  const provinces = await pcVN.getProvinces();
  return provinces;
}

exports.getOne = async (query, code) => {
  const states = pcVN.getDistrictsByProvinceCode(code);
  if (!states) {
    throw Boom.badRequest('Province not found.')
  }
  return states;
}