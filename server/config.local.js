'use strict';

module.exports = {
  remoting: {
    errorHandler: {
      handler(err, req, res, next) {
        // custom error handling for model remoting
        // var log = require('debug')('server:rest:errorHandler'); // example
        // console.log('remoting ERR:', req.method, req.originalUrl, err);

        // call next() to fall back to the default error handler
        next();
      },
    },
  },
};
