'use strict';
const path = require('path');
const CustomModel = require('./CustomModel');

class Order extends CustomModel {
  static get tableName() {
    return 'order';
  }
  $beforeInsert() {
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }

  static get relationMappings() {
    return {
      orderDetails: {
        relation: CustomModel.HasManyRelation,
        modelClass: path.join(__dirname, '/OrderDetail'),
        join: {
          from: 'order.id',
          to: 'orderDetail.orderId'
        }
      }
    };
  }
}

module.exports = Order;