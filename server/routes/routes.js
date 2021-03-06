'use strict';

var dsConfig = require('../datasources.json');
var login = require('../controller/action/login');
var status = require('../controller/action/status');
var ftp = require('../controller/action/ftpaction');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({uploadDir: './server/public/tmp'});

module.exports = function(app) {
  var Luser = app.models.Luser;
  /*
  * ===================================
  *           login route
  *
  * ===================================
  * */
  app.get('/login', function(req, res) {
    var credentials = dsConfig.emailDs.transports[0].auth;
    res.render('login', {
      email: credentials.user,
      password: credentials.pass,
    });
  });
  app.use('/loginsub', login.loginsub);

  app.get('/', function(req, res) {
    res.render('login_');
  });
  app.get('/logout', function(req, res, next) {
    if (!req.accessToken) return res.sendStatus(401);
    Luser.logout(req.accessToken.id, function(err) {
      if (err) return next(err);
      res.redirect('/');
    });
  });
  app.use('/main', function(req, res) {
    res.render('home_');
  });
  app.get('/sign', function(req, res) {
    console.log('sign');
    res.render('sign_');
  });
/*
* ===================================
*          GET status
*
* ===================================
* */
  app.use('/requestStatus', status.get);
  app.use('/resultfrommepl', status.getmeplresult);
  app.get('/flash', function(req, res) {
    req.flash('success', 'flash success');
  });

  /*
  * ===================================
  *          ftp function
  *
  * ===================================
  * */
  app.use('/fileupload', multipartMiddleware, ftp.fromftp);
  app.use('/ftpresult', ftp.listftp);
  app.use('/downftp', ftp.down);
  app.use('./ftpdelete', ftp.ftpdelete);

  /*
  //======================================
             中间件
  //======================================
   */
  app.use('/api/apars/v1/me', function(req, res, next) {
    console.log('middleware working...')
    req.user={"id":"123"};
    next();
  });
};
