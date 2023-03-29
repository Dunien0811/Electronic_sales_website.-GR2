'use strict';

const Boom = require('@hapi/boom');
const _ = require('lodash');
const Models = require('../../db/models');
const { COMPLETE } = require('../../config/type')

exports.countDashboard = async (query) => {
  const { startTime, endTime } = query;
  let countCustomer = Models.User.query().count();
  let countOrder = Models.Order.query().count();
  let sumRevenue = Models.Order.query().sum('totalAmount as total').where('isPaid', true);
  if (startTime && endTime) {
    countCustomer.whereBetween('createdAt', [startTime, endTime]);
    countOrder.whereBetween('createdAt', [startTime, endTime]);
    sumRevenue.whereBetween('createdAt', [startTime, endTime]);
  }
  const countProduct = Models.Product.query().count();
  let [customer, order, revenue, product] = await Promise.all([countCustomer, countOrder, sumRevenue, countProduct])
  const result = {
    customerCount: customer[0].count ? customer[0].count : 0,
    orderCount: order[0].count ? order[0].count : 0,
    income: revenue[0].total ? revenue[0].total : 0,
    productCount: product[0].count ? product[0].count : 0
  }
  return result;
}