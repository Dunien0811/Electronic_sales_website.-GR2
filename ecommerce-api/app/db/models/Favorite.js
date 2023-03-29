'use strict';

const CustomModel = require('./CustomModel');
const path = require('path');

class Favorite extends CustomModel {
  static get tableName() {
    return 'favorite';
  }
  static get relationMappings() {
    return {
      products: {
        relation: CustomModel.BelongsToOneRelation,
        modelClass: path.join(__dirname, '/Product'),
        join: {
          from: 'favorite.productId',
          to: 'product.id'
        }
      }
    };
  }
}

module.exports = Favorite;