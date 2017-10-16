 'use strict';
 var signsub = function(req, res) {

 };

 var loginsub = function(req, res) {
   var app = req.app;
   var mongoDs = app.dataSources.mongodb;
   var Luser = app.models.Luser;
   var Role = app.models.Role;
   var RoleMapping = app.models.RoleMapping;
   var AccessToken = app.models.AccessToken;
   var TWO_WEEKS = 60 * 60 * 24 * 7 * 2;

/*  User.login({
    email: 'me@domain.com',           // must provide email or "username"
    password: 'secret',               // required by default
    ttl: TWO_WEEKS                    // keep the AccessToken alive for at least two weeks
  }, function (err, accessToken) {
    console.log(accessToken.id);      // => GOkZRwg... the access token
    console.log(accessToken.ttl);     // => 1209600 time to live
    console.log(accessToken.created); // => 2013-12-20T21:10:20.377Z
    console.log(accessToken.userId);  // => 1
  }); */

   console.log(req.body.email);
   console.log(req.body.password);
   Luser.login({
     email: req.body.email,
     password: req.body.password,
     ttl: TWO_WEEKS,
   }, 'Luser', function(err, token) {
     console.log(token);

 //   var accessToken=token;
    // console.log(accessToken.id);      // => GOkZRwg... the access token
    // console.log(accessToken.ttl);     // => 1209600 time to live
    // console.log(accessToken.created); // => 2013-12-20T21:10:20.377Z
    // console.log(accessToken.userId);  // => 1

     if (err) {
       return  res.render('login_', {message: 'login err'});
     } else {
       return  res.render('home_', {
         message: 'name:\n' + req.body.name + '\n' +
       'emial:\n' + req.body.email + '\n' +
         'accesstoken:\n' + token.id,
         success: 'login success',
       });
     }
   });
 };
 exports.signsub = signsub;
 exports.loginsub = loginsub;

