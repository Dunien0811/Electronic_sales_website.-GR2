'use strict';

const BaseControllerCRUD = require('../../base/BaseControllerCRUD');
const ProducerService = require('./service');

class ProducerController extends BaseControllerCRUD {
  constructor() {
    super(new ProducerService());
  }
  
  async getManyByCategoryId(request) {
    const { id } = request.params;
    try {
      return await this.service.getManyByCategoryId(request.query, id);
    } catch (err) {
      throw err;
    }
  };

}

module.exports = ProducerController;
