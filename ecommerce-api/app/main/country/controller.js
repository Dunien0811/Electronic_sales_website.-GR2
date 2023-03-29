'use strict';

const service = require('./service');

exports.getMany = async (request) => {
  try {
    return await service.getMany(request.query);
  } catch (err) {
    throw err;
  }
};

exports.getOne = async (request) => {
  const { code } = request.params;
  try {
    return await service.getOne(request.query, code);
  } catch (err) {
    throw err;
  }
};