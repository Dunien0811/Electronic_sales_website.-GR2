'use strict';

const BaseControllerCRUD = require('../../base/BaseControllerCRUD');
const DiscountService = require('./service');

class DiscountController extends BaseControllerCRUD {
  constructor() {
    super(new DiscountService());
  }
}

module.exports = DiscountController;
