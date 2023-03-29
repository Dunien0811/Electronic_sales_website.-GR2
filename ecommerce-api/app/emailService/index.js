'use strict';
const path = require('path');

require('dotenv').config();
const passwordReset = path.join(__dirname, 'emails', 'template', 'resetPassword.ejs');
const createOrderEmail = path.join(__dirname, 'emails', 'template', 'createOrderEmail.ejs');
const confirmOrderEmail = path.join(__dirname, 'emails', 'template', 'confirmOrderEmail.ejs');
const shippedEmail = path.join(__dirname, 'emails', 'template', 'shippedEmail.ejs');
const completeOrderEmail = path.join(__dirname, 'emails', 'template', 'completeOrderEmail.ejs');
const contactEmail = path.join(__dirname, 'emails', 'template', 'contactEmail.ejs');

const Email = require('email-templates');
const moment = require('moment');
const Models = require('./../db/models');
const config = require('../config')
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(config.sendgrid.secretKey);

const email = new Email({
  message: {
    from: config.sendgrid.fromEmail
  },
  transport: {
    jsonTransport: true
  },
  views: {
    options: {
      extension: 'ejs'
    }
  }
});

async function sendEmailResetPassword(receiverEmail, resetPasswordUrl) {
  try {
    const content = await email
      .render(passwordReset, {
        name: 'Limupa Shop',
        token: resetPasswordUrl,
        timeToken: 24
      });
    const mailOptions = {
      from: config.sendgrid.fromEmail,
      to: receiverEmail,
      subject: 'Limupa Shop! Reset password request',
      html: content
    };
    sgMail.send(mailOptions);
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function sendEmailContactEmail(receiverEmail) {
  try {
    const content = await email
      .render(contactEmail, {
        name: receiverEmail,
      });
    const mailOptions = {
      from: config.sendgrid.fromEmail,
      to: receiverEmail,
      subject: 'Limupa Shop! Re: your contact 1',
      html: content
    };
    sgMail.send(mailOptions)
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function sendEmailCreateOrderEmail(receiverEmail) {
  try {
    const content = await email
      .render(createOrderEmail, {
        name: receiverEmail
      });
    const mailOptions = {
      from: config.sendgrid.fromEmail,
      to: receiverEmail,
      subject: 'Limupa Shop! Your order has been created',
      html: content
    };
    sgMail.send(mailOptions);
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function sendEmailShippedOrder(id) {
  const order = await Models.Order.query().findById(id);
  if(!order) {
    return {message: 'order not found'}
  }
  const user = await Models.User.query().findById(order.userId);
  if (!user) {
    return {message: 'user not found'}
  }
  try {
    const content = await email
      .render(shippedEmail, {
        name: order.fullName,
      });
    const mailOptions = {
      from: config.sendgrid.fromEmail,
      to: user.email,
      subject: 'Limupa Shop! Your order was shipping',
      html: content
    };
    sgMail.send(mailOptions);
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function sendEmailConfirmOrderEmail(id) {
  const order = await Models.Order.query().findById(id).eager('orderDetails');
  if(!order) {
    return {message: 'order not found'}
  }
  const user = await Models.User.query().findById(order.userId);
  if (!user) {
    return {message: 'user not found'}
  }
  const formatDay = moment(order.createdAt).format('DD/MM/YYYY H:mm a');
  try {
    const content = await email
      .render(confirmOrderEmail, {
        name: order.fullName,
        order,
        date: formatDay
      });
    const mailOptions = {
      from: config.sendgrid.fromEmail,
      to: user.email,
      subject: 'Limupa Shop! Your order has been confirmed',
      html: content
    };
    sgMail.send(mailOptions);
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function sendEmailCompleteOrderEmail(id) {
  const order = await Models.Order.query().findById(id);
  if(!order) {
    return {message: 'order not found'}
  }
  const user = await Models.User.query().findById(order.userId);
  if (!user) {
    return {message: 'user not found'}
  }
  try {
    const content = await email
      .render(completeOrderEmail, {
        name: order.fullName
      });
    const mailOptions = {
      from: config.sendgrid.fromEmail,
      to: user.email,
      subject: 'Limupa Shop! Your order has been completed',
      html: content
    };
    sgMail.send(mailOptions);
  } catch (err) {
    console.log(err);
    return err;
  }
}

module.exports.sendEmailResetPassword = sendEmailResetPassword;
module.exports.sendEmailCreateOrderEmail = sendEmailCreateOrderEmail;
module.exports.sendEmailConfirmOrderEmail = sendEmailConfirmOrderEmail;
module.exports.sendEmailShippedOrder = sendEmailShippedOrder;
module.exports.sendEmailCompleteOrderEmail = sendEmailCompleteOrderEmail;
module.exports.sendEmailContactEmail = sendEmailContactEmail;
