'use strict';

const Boom = require('@hapi/boom');
const Models = require('../../db/models');
const BaseServiceCRUD = require('../../base/BaseServiceCRUD');

class DiscountService extends BaseServiceCRUD {
  constructor() {
    super(Models.Discount, 'Discount');
  }
  getSearchQuery(builder, q) {
    builder.andWhere(function (){
      this.whereRaw('LOWER(nameDiscount) LIKE \'%\' || LOWER(?) || \'%\' ', q);
    });
  }
}

module.exports = DiscountService;
