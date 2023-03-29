'use strict';

const AuthController = require('./controller');
const validator = require('./validator');

const controller = new AuthController();

exports.login = {
  description: 'Login to an account',
  notes: 'Login and return user info and token',
  tags: ['api', 'v1'],
  handler: controller.login.bind(controller),
  auth: false,
  validate: {
    payload: validator.validateLogin
  }
};

exports.loginAdmin = {
  description: 'Login to an account',
  notes: 'Login and return user info and token',
  tags: ['api', 'v1'],
  handler: controller.loginAdmin.bind(controller),
  auth: false,
  validate: {
    payload: validator.validateLoginAdmin
  }
};

exports.register = {
  description: 'Register an account to system',
  notes: 'Register and return user info and token',
  tags: ['api', 'v1'],
  handler: controller.register.bind(controller),
  auth: false,
  validate: {
    payload: validator.validateRegister
  }
};

exports.logout = {
  description: 'Logout api',
  notes: 'User logout api',
  tags: ['api', 'v1'],
  handler: controller.logout.bind(controller),
  auth: false,
  validate: validator.logout
};

exports.forgotPassword = {
  description: 'Forgot password api',
  notes: 'Forgot password and send email to reset password',
  tags: ['api', 'v1'],
  handler: controller.forgotPassword.bind(controller),
  auth: false,
  validate: {
    payload: validator.forgotPassword
  }
};

exports.resetPassword = {
  description: 'reset password api',
  notes: 'Reset pasword of an user to new one',
  tags: ['api', 'v1'],
  handler: controller.resetPassword.bind(controller),
  auth: false,
  validate: {
    payload: validator.resetPassword
  }
};

exports.loginFacebook = {
  description: 'Login with facebook for mobile app',
  notes: 'Login with facebook for mobile app return session token',
  tags: ['api', 'v1'],
  handler: controller.loginFacebook.bind(controller),
  auth: false,
  validate: { query: validator.validateFacebook }
};

exports.requestCartToken = {
  description: 'Api to request cart token',
  notes: 'Api to request cart token',
  tags: ['api', 'v1'],
  handler: controller.requestCartToken.bind(controller),
  auth: false,
};
