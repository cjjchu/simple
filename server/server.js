'use strict';
var bodyParser = require('body-parser');
var loopback = require('loopback');
var boot = require('loopback-boot');
var path = require('path');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var session = require('express-session');
var app = module.exports = loopback();
var log4js = require('log4js');
const searchIndex = require('search-index');


// configure view handler
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public/views'));
// app.use(loopback.token());
// app.use(loopback.session({ secret: 'keyboard cat' }));

// =======log===================
var log = require('log4js').getLogger('server');
app.use(log4js.connectLogger(log4js.getLogger('http'), {level: 'auto'}));
// =======log end======================

app.use(session({secret: 'simple',resave: false,
  saveUninitialized: true,
  cookie: { secure: false }}));

app.use(cookieParser('simple'));
app.use(loopback.token());
// app.use(flash());//flash中间件
// 本地配置
app.locals.blog = {
  title: 'asd',
  description: 'ads',
};
app.middleware('initial', bodyParser.urlencoded({extended: true}));

app.get('/log', function(req, res) {
  log.info('test info log');
  log.error('test error log');
  log.debug('test dubug log');
  res.end('log');
});

require('./routes/routes')(app);

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

boot(app, __dirname, function(err) {
  if (err) throw err;
  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});


process.on('uncaughtException', function(err) {
  console.error('uncaughtException: %s', JSON.stringify(err), err.track);
});

