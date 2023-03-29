'use strict';

const CustomModel = require('./CustomModel');
const path = require('path');

class Rating extends CustomModel {
  static get tableName() {
    return 'rating';
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
      products: {
        relation: CustomModel.BelongsToOneRelation,
        modelClass: path.join(__dirname, '/Product'),
        join: {
          from: 'rating.productId',
          to: 'product.id'
        }
      },
      user: {
        relation: CustomModel.BelongsToOneRelation,
        modelClass: path.join(__dirname, '/User'),
        join: {
          from: 'rating.userId',
          to: 'users.id'
        }
      }
    };
  }
}

module.exports = Rating;