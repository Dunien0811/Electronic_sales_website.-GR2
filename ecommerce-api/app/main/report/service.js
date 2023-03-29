'use strict';

const Boom = require('@hapi/boom');
const Models = require('../../db/models');
const { knex } = require('../../db/models');
const BaseServiceCRUD = require('../../base/BaseServiceCRUD');
const _ = require('lodash');

class CategoryService extends BaseServiceCRUD {
  constructor() {
    super(Models.Category, 'Category');
  }

  async getReportIncome(query) {
    const queryBuilderAll = await Models.Order.query().select(knex.raw('to_char(date_trunc(\'Month\',\"createdAt\"),\'mm\') as month'))
      .sum('totalAmount as total')
      .where('isPaid', true)
      .groupBy(1);
    return queryBuilderAll;
  }
  async getReportContact(query) {
    const queryBuilderAll = await Models.Contact.query().select(knex.raw('to_char(date_trunc(\'Month\',\"createdAt\"),\'mm\') as month'))
      .count('id as count')
      .groupBy(1);
    return queryBuilderAll;
  }
  async getReportProducts(query) {
    const resultFake = await Models.Category.query();
    if(!resultFake) {
      throw Boom.notFound('Category not found')
    }
    const arrRealCategories = await Models.Product.query().select('category.nameCategory')
    .innerJoin('category', 'product.categoryId', '=', 'category.id')
    .count()
    .groupBy('category.id')

    let arrFakeCategories = [];
    resultFake.map(item => {
      arrFakeCategories.push({
        nameCategory: item.nameCategory,
        count: 0
      })
    })
    arrFakeCategories.map((itemFake) => {
      arrRealCategories.map((itemReal) => {
        if (itemFake.nameCategory === itemReal.nameCategory) {
          itemFake.count = itemReal.count;
        }
      });
    });

    return arrFakeCategories;
  }

  getSearchQuery(builder, q) {
    builder.andWhere(function () {
      this.whereRaw('LOWER("nameCategory") LIKE \'%\' || LOWER(?) || \'%\' ', q);
    });
  }
}

module.exports = CategoryService;
