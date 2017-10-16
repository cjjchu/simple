'use strict'

var dsConfig = require('../datasources.json');
var path = require('path');
var login = require('../controller/action/login');


module.exports = function(app) {
  var Luser = app.models.Luser;

  //  login page
  app.get('/login', function(req, res) {
    var credentials = dsConfig.emailDs.transports[0].auth;
    res.render('login', {
      email: credentials.user,
      password: credentials.pass,
    });
  });
  app.use('/loginsub',login.loginsub)



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

 // app.post('login', login);
  app.use('/main', function(req, res) {
    res.render('home_');
  });
  app.get('/sign', function(req, res) {
    console.log('sign');
    res.render('sign_');
  });

  app.get('/flash', function(req, res) {
    req.flash('success', 'flash success');
  });

};
