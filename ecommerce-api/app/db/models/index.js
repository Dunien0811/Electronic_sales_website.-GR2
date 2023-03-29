'use strict';

const knex = require('../connection');
const User = require('./User');
const Role = require('./Role');
const Blog = require('./Blog');
const Category = require('./Category');
const Discount = require('./Discount');
const Favorite = require('./Favorite');
const Order = require('./Order');
const OrderDetail = require('./OrderDetail');
const Product = require('./Product');
const Rating = require('./Rating');
const Producer = require('./Producer');
const Contact = require('./Contact');

module.exports = {
  knex,
  User,
  Role,
  Blog,
  Category,
  Discount,
  Favorite,
  Order,
  OrderDetail,
  Product,
  Rating,
  Producer,
  Contact
};
