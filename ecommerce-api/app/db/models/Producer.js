'use strict';

const CustomModel = require('./CustomModel');
const path = require('path');
class Producer extends CustomModel {
  static get tableName() {
    return 'producer';
  }
  static get relationMappings() {
    return {
      categories: {
        relation: CustomModel.BelongsToOneRelation,
        modelClass: path.join(__dirname, '/Category'),
        join: {
          from: 'producer.categoryId',
          to: 'category.id'
        }
      }
    };
  }
}
module.exports = Producer;