'use strict';

const http = require('http');
const https = require('https');
const sslConfig = require('./config/ssl-config');
const loopback = require('loopback');
const boot = require('loopback-boot');
const log = require('./utils/logHelper');
const morgan = require('morgan');
const multer = require('multer');
const searchIndex = require('search-index');

const upload = multer({
  dest: 'uploads/',
});

const bodyParser = require('body-parser');

// var session = require('cookie-session');

const app = module.exports = loopback();

log.use(app);
app.use(morgan('dev'));

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

// multipart/form-data
app.use(upload.single('recfile'));

// When you register middleware with the Express API,
// it is always executed at the beginning of the routes phase.
// app.use(loopback.context());

/* app.use(loopback.token({
    currentUserLiteral: 'me',
    headers: ['x-auth-token', 'X-Auth-Token']
})); */

// required for `state` support, req.session.originalUrl
// app.use(session({
//    secret: 'a keyboard cat'
// }));

// https or http
app.start = (httpOnly) => {
  // if (!httpOnly) httpOnly = process.env.HTTP;

  let server = null;
  if (!httpOnly) {
    const options = {
      key: sslConfig.privateKey,
      cert: sslConfig.certificate,
    };
    server = https.createServer(options, app);
  } else {
    server = http.createServer(app);
  }

  // start the web server
  server.listen(app.get('port'), () => {
    app.emit('started');
    // var baseUrl = app.get('url').replace(/\/$/, '');
    const baseUrl = `${httpOnly ? 'http://' : 'https://'}${app.get('host')}:${app.get('port')}`;
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      const explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });

  return server;
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, (err) => {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module) {
    // search index
    searchIndex({}, (err1, si) => {
      if (err1) throw err1;
      app.si = si;
      // build search engine if totalDocs is 0
      app.models.Search.info_v1((err2, info) => {
        if (err2) throw err2
        else if (info.totalDocs === 0){
          app.models.Search.build_v1((err3) => {
            if (err3) throw err3;
            console.log('Search Engine Build success');
          })
        }
      });

      app.start('HTTP');
    });
  }



});


process.on('uncaughtException', function (err) {
    console.log('这是一个致命的错误')
    console.log('Caught exception: ' + err);
});