'use strict';
const passport = require('passport');
// const logger = require('../utils/logHelper').helper;
// var app = require('../server');

module.exports = () => (
  function idaasAuth(req, res, next) {
    // logger.writeInfo('OAuth middleware triggered on %s', req.url);

    if (req.url.startsWith('/auth')) {
      next();
    } else if (req.url.startsWith('/html')) {
      next();
    } else if (req.url.startsWith('/explorer')) {
      next();
    } else {
      switch (req.url) {
        case '/':
          next();
          break;
        case '/api/accounts/v1/login':
          next();
          break;
        default:
          passport.authenticate('bearer', {
            session: false,
          })(req, res, next);
      }
    }
  }
);
