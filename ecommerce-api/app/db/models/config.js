'use strict';

const { Model } = require('objection');
const knexPostgis = require('knex-postgis');
const knex = require('../connection');

Model.knex(knex);

const st = knexPostgis(knex);

module.exports = {
  Model,
  st,
  knex
};

