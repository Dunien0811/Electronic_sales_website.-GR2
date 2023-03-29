'use strict';

const BaseControllerCRUD = require('../../base/BaseControllerCRUD');
const ContactService = require('./service');

class ContactController extends BaseControllerCRUD {
  constructor() {
    super(new ContactService());
  }
}

module.exports = ContactController;
