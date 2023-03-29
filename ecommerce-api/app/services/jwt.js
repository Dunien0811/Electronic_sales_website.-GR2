'use strict';

const jsonwebtoken = require('jsonwebtoken');
const config = require('../config')
const _ = require('lodash');

class Jwt {
  constructor() {
    this.secret = config.jwt.secretKey;
    this.ttl = 7 * 24 * 60 * 60 * 1000; 
  }

  issue(payload, jwtOptions = {}) {
    return jsonwebtoken.sign(
      _.assign(payload, {
        ttl: this.ttl
      }),
      this.secret
    );
  }
}

module.exports = new Jwt();
