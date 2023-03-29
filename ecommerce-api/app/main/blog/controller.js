'use strict';

const BaseControllerCRUD = require('../../base/BaseControllerCRUD');
const BlogService = require('./service');

class BlogController extends BaseControllerCRUD {
  constructor() {
    super(new BlogService());
  }
}

module.exports = BlogController;
