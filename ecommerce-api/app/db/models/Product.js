'use strict';

const CustomModel = require('./CustomModel');
const path = require('path');

class Product extends CustomModel {
  static get tableName() {
    return 'product';
  }

  static get jsonSchema() {
    return {
      type: 'object',

      properties: {
        properties: { type: 'object' },
        gallery: { type: 'array' }
      }
    };
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
      categories: {
        relation: CustomModel.BelongsToOneRelation,
        modelClass: path.join(__dirname, '/Category'),
        join: {
          from: 'product.categoryId',
          to: 'category.id'
        }
      },
      rating: {
        relation: CustomModel.HasManyRelation,
        modelClass: path.join(__dirname, '/Rating'),
        join: {
          from: 'product.id',
          to: 'rating.productId'
        }
      }
    };
  }
}

module.exports = Product;