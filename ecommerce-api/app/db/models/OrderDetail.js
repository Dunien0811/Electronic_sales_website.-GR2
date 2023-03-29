'use strict';

const CustomModel = require('./CustomModel');
const path = require('path');
class OrderDetail extends CustomModel {
  static get tableName() {
    return 'orderDetail';
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
      product: {
        relation: CustomModel.BelongsToOneRelation,
        modelClass: path.join(__dirname, '/Product'),
        join: {
          from: 'orderDetail.productId',
          to: 'product.id'
        }
      }
    };
  }
}

module.exports = OrderDetail;