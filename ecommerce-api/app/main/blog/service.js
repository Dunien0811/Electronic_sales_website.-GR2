'use strict';

const Boom = require('@hapi/boom');
const Models = require('../../db/models');
const BaseServiceCRUD = require('../../base/BaseServiceCRUD');

class BlogService extends BaseServiceCRUD {
  constructor() {
    super(Models.Blog, 'Blog');
  }
  getSearchQuery(builder, q) {
    builder.andWhere(function (){
      this.whereRaw('LOWER(title) LIKE \'%\' || LOWER(?) || \'%\' ', q);
    });
  }
}

module.exports = BlogService;
