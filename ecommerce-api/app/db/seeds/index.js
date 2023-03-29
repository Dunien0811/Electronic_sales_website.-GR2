"use strict";

const Models = require("../models");
const PasswordUtils = require("../../services/password");

const dataRole = [
  {
    nameRole: "admin",
    description: "admin",
    isActive: true,
  },
  {
    nameRole: "staff",
    description: "staff",
    isActive: true,
  },
  {
    nameRole: "user",
    description: "user",
    isActive: true,
  },
];

const dataUser = [
  {
    email: "admin@gmail.com",
    name: "admin",
    isVerifyEmail: true,
  },
  {
    email: "staff@gmail.com",
    name: "staff",
    isVerifyEmail: true,
  },
  {
    email: "user@gmail.com",
    name: "user",
    isVerifyEmail: true,
  },
];

const dataCategory = [
  {
    nameCategory: "SMARTPHONE",
    image: "https://via.placeholder.com/300x300.png",
    isActive: true,
    createdAt: "2019-12-05T15:03:11.311Z",
    updatedAt: "2019-12-05T15:08:15.904Z",
  },
  {
    nameCategory: "TABLET",
    image: "https://via.placeholder.com/300x300.png",
    isActive: true,
    createdAt: "2019-12-05T15:04:12.107Z",
    updatedAt: "2019-12-05T15:09:01.724Z",
  },
  {
    nameCategory: "WATCH",
    image: "https://via.placeholder.com/300x300.png",
    isActive: true,
    createdAt: "2019-12-05T15:04:16.727Z",
    updatedAt: "2019-12-05T15:09:48.556Z",
  },
  {
    nameCategory: "LAPTOP",
    image: "https://via.placeholder.com/300x300.png",
    isActive: true,
    createdAt: "2019-12-05T15:04:30.555Z",
    updatedAt: "2019-12-05T15:10:34.649Z",
  },
  {
    nameCategory: "OFFICE",
    image: "https://via.placeholder.com/300x300.png",
    isActive: true,
    createdAt: "2019-12-05T15:04:25.278Z",
    updatedAt: "2019-12-05T15:11:12.111Z",
  },
];

const dataProducer = [
  {
    name: "IPHONE",
    categoryId: "SMARTPHONE",
    isActive: true,
    image: "https://via.placeholder.com/300x300.png",
  },
  {
    name: "SAMSUNG",
    categoryId: "SMARTPHONE",
    isActive: true,
    image: "https://via.placeholder.com/300x300.png",
  },
  {
    name: "OPPO",
    categoryId: "SMARTPHONE",
    isActive: true,
    image: "https://via.placeholder.com/300x300.png",
  },
  {
    name: "XIAOMI",
    categoryId: "SMARTPHONE",
    isActive: true,
    image: "https://via.placeholder.com/300x300.png",
  },
  {
    name: "VIVO",
    categoryId: "SMARTPHONE",
    isActive: true,
    image: "https://via.placeholder.com/300x300.png",
  },
  {
    name: "HUAWEI",
    categoryId: "SMARTPHONE",
    isActive: true,
    image: "https://via.placeholder.com/300x300.png",
  },
  {
    name: "IPAD",
    categoryId: "TABLET",
    isActive: true,
    image: "https://via.placeholder.com/300x300.png",
  },
  {
    name: "SAMSUNG",
    categoryId: "TABLET",
    isActive: true,
    image: "https://via.placeholder.com/300x300.png",
  },
  {
    name: "HUAWEI",
    categoryId: "TABLET",
    isActive: true,
    image: "https://via.placeholder.com/300x300.png",
  },
  {
    name: "LENOVO",
    categoryId: "TABLET",
    isActive: true,
    image: "https://via.placeholder.com/300x300.png",
  },
  {
    name: "MASSTEL",
    categoryId: "TABLET",
    isActive: true,
    image: "https://via.placeholder.com/300x300.png",
  },
  {
    name: "MOBELL",
    categoryId: "TABLET",
    isActive: true,
    image: "https://via.placeholder.com/300x300.png",
  },
  {
    name: "MACBOOK",
    categoryId: "LAPTOP",
    isActive: true,
    image: "https://via.placeholder.com/300x300.png",
  },
  {
    name: "HP",
    categoryId: "LAPTOP",
    isActive: true,
    image: "https://via.placeholder.com/300x300.png",
  },
  {
    name: "ASUS",
    categoryId: "LAPTOP",
    isActive: true,
    image: "https://via.placeholder.com/300x300.png",
  },
  {
    name: "DELL",
    categoryId: "LAPTOP",
    isActive: true,
    image: "https://via.placeholder.com/300x300.png",
  },
  {
    name: "LENOVO",
    categoryId: "LAPTOP",
    isActive: true,
    image: "https://via.placeholder.com/300x300.png",
  },
  {
    name: "ACER",
    categoryId: "LAPTOP",
    isActive: true,
    image: "https://via.placeholder.com/300x300.png",
  },
  {
    name: "MSI",
    categoryId: "LAPTOP",
    isActive: true,
    image: "https://via.placeholder.com/300x300.png",
  },
  {
    name: "LIGHTNING",
    categoryId: "OFFICE",
    isActive: true,
    image: "https://via.placeholder.com/300x300.png",
  },
  {
    name: "XMOBILE",
    categoryId: "OFFICE",
    isActive: true,
    image: "https://via.placeholder.com/300x300.png",
  },
  {
    name: "AWEI",
    categoryId: "OFFICE",
    isActive: true,
    image: "https://via.placeholder.com/300x300.png",
  },
  {
    name: "KANEN",
    categoryId: "OFFICE",
    isActive: true,
    image: "https://via.placeholder.com/300x300.png",
  },
  {
    name: "FENDA",
    categoryId: "OFFICE",
    isActive: true,
    image: "https://via.placeholder.com/300x300.png",
  },
  {
    name: "APPLE",
    categoryId: "WATCH",
    isActive: true,
    image: "https://via.placeholder.com/300x300.png",
  },
  {
    name: "SAMSUNG",
    categoryId: "WATCH",
    isActive: true,
    image: "https://via.placeholder.com/300x300.png",
  },
  {
    name: "XIAOMI",
    categoryId: "WATCH",
    isActive: true,
    image: "https://via.placeholder.com/300x300.png",
  },
  {
    name: "HUAWEI",
    categoryId: "WATCH",
    isActive: true,
    image: "https://via.placeholder.com/300x300.png",
  },
  {
    name: "ZEBLAZE",
    categoryId: "WATCH",
    isActive: true,
    image: "https://via.placeholder.com/300x300.png",
  },
];

const dataProduct = [
  {
    nameProduct: "Máy tính bảng iPad Pro 11 inch Wifi 64GB (2018)",
    image: "https://via.placeholder.com/300x300.png",
    gallery: ["https://via.placeholder.com/300x300.png"],
    price: 982,
    description:
      "<p>A product description is the marketing copy that explains what a product is and why it's worth purchasing. The purpose of a product description is to supply customers with important information about the features and benefits of the product so they're compelled to buy.</p>",
    numberAvailable: 6,
    properties: {},
    isActive: true,
    categoryId: "TABLET",
    producerId: "IPAD",
    createdAt: "2019-12-05T16:04:13.441Z",
    updatedAt: "2019-12-29T07:16:29.960Z",
  },
  {
    nameProduct: "Đồng hồ thông minh Xiaomi Amazfit Pace GPS",
    image: "https://via.placeholder.com/300x300.png",

    gallery: ["https://via.placeholder.com/300x300.png"],
    price: 125,
    description:
      "<p>A product description is the marketing copy that explains what a product is and why it's worth purchasing. The purpose of a product description is to supply customers with important information about the features and benefits of the product so they're compelled to buy.</p>",
    numberAvailable: 7,
    properties: {},
    isActive: true,
    categoryId: "WATCH",
    producerId: "XIAOMI",
    createdAt: "2019-12-05T15:35:27.795Z",
    updatedAt: "2019-12-29T07:41:23.140Z",
  },
  {
    nameProduct: "Vòng đeo tay thông minh Mi Band 4",
    image: "https://via.placeholder.com/300x300.png",
    gallery: ["https://via.placeholder.com/300x300.png"],

    price: 35,
    description:
      "<p>A product description is the marketing copy that explains what a product is and why it's worth purchasing. The purpose of a product description is to supply customers with important information about the features and benefits of the product so they're compelled to buy.</p>",
    numberAvailable: 7,
    properties: {},
    isActive: true,
    categoryId: "WATCH",
    producerId: "XIAOMI",
    createdAt: "2019-12-05T15:35:02.383Z",
    updatedAt: "2019-12-29T07:43:07.318Z",
  },
  {
    nameProduct: "Đồng hồ thông minh Samsung Galaxy Watch Active 2",
    image: "https://via.placeholder.com/300x300.png",
    gallery: ["https://via.placeholder.com/300x300.png"],

    price: 411,
    description:
      "<p>A product description is the marketing copy that explains what a product is and why it's worth purchasing. The purpose of a product description is to supply customers with important information about the features and benefits of the product so they're compelled to buy.</p>",
    numberAvailable: 7,
    properties: {},
    isActive: true,
    categoryId: "WATCH",
    producerId: "SAMSUNG",
    createdAt: "2019-12-05T15:32:30.559Z",
    updatedAt: "2019-12-29T07:46:51.049Z",
  },
  {
    nameProduct: "Điện thoại OPPO Reno 10x Zoom Edition",
    image: "https://via.placeholder.com/300x300.png",
    gallery: ["https://via.placeholder.com/300x300.png"],

    price: 862,
    description:
      "<p>A product description is the marketing copy that explains what a product is and why it's worth purchasing. The purpose of a product description is to supply customers with important information about the features and benefits of the product so they're compelled to buy.</p>",
    numberAvailable: 5,
    properties: {},
    isActive: true,
    categoryId: "SMARTPHONE",
    producerId: "OPPO",
    createdAt: "2019-12-05T15:56:51.690Z",
    updatedAt: "2019-12-29T07:22:33.712Z",
  },
  {
    nameProduct: "Điện thoại Samsung Galaxy Note 10",
    image: "https://via.placeholder.com/300x300.png",
    gallery: ["https://via.placeholder.com/300x300.png"],

    price: 1110,
    description:
      "<p>A product description is the marketing copy that explains what a product is and why it's worth purchasing. The purpose of a product description is to supply customers with important information about the features and benefits of the product so they're compelled to buy.</p>",
    numberAvailable: 5,
    properties: {},
    isActive: true,
    categoryId: "SMARTPHONE",
    producerId: "SAMSUNG",
    createdAt: "2019-12-05T15:56:00.394Z",
    updatedAt: "2019-12-29T07:24:29.343Z",
  },
];

exports.seed = async function (knex, prom) {
  const users = await Models.User.query();
  if(users.length === 0) {
  await Models.Role.query().delete();
  await Models.User.query().delete();
  await Models.Category.query().delete();
  await Models.Producer.query().delete();
  await Models.Product.query().delete();

  const roles = await Models.Role.query().insert(dataRole).returning("*");
  const newUsers = dataUser.map((e) => {
    e.roleId = roles.find((i) => i.nameRole === e.name).id;
    e.password = PasswordUtils.hashSync("123456");
    return e;
  });
  await Models.User.query().insert(newUsers);

  const categories = await Models.Category.query()
    .insert(dataCategory)
    .returning("*");
  const newProducers = dataProducer.map((e) => {
    e.categoryId = categories.find((i) => i.nameCategory === e.categoryId).id;
    return e;
  });
  const producers = await Models.Producer.query()
    .insert(newProducers)
    .returning("*");

  const newProducts = dataProduct.map((e) => {
    e.categoryId = categories.find((i) => i.nameCategory === e.categoryId).id;
    e.producerId = producers.find((i) => i.name === e.producerId).id;
    return e;
  });
  await Models.Product.query().insert(newProducts);    
}
return 1;
};
