var express = require('express'),
  passport = require('passport'),
  util = require('util'),
  OpenIDStrategy = require('passport-openid').Strategy;

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the OpenID identifier is serialized and
//   deserialized.
passport.serializeUser(function(user, done) {
  done(null, user.identifier);
});

passport.deserializeUser(function(identifier, done) {
  done(null, {identifier: identifier});
});

// Use the OpenIDStrategy within Passport.
//   Strategies in passport require a `validate` function, which accept
//   credentials (in this case, an OpenID identifier), and invoke a callback
//   with a user object.
passport.use(new OpenIDStrategy({
  returnURL: 'http://localhost:3000/auth/openid/return',
  realm: 'http://localhost:3000/',
},
  function(identifier, done) {
    // asynchronous verification, for effect...
    process.nextTick(function() {
      // To keep the example simple, the user's OpenID identifier is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the OpenID identifier with a user record in your database,
      // and return that user instead.
      return done(null, {identifier: identifier});
    });
  }
));

var loopback = require('loopback');
var app = loopback();

app.get('/', function(req, res) {
  res.end('asd' + {user: req.user});
});

app.get('/account', ensureAuthenticated, function(req, res) {
  res.render('account', {user: req.user});
});

app.get('/login', function(req, res) {
  res.end('login', {user: req.user});
});

// POST /auth/openid
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in OpenID authentication will involve redirecting
//   the user to their OpenID provider.  After authenticating, the OpenID
//   provider will redirect the user back to this application at
//   /auth/openid/return
app.get('/auth/openid',
  passport.authenticate('openid', {failureRedirect: '/login'}),
  function(req, res) {
    res.redirect('/');
  });

// GET /auth/openid/return
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/openid/return',
  passport.authenticate('openid', {failureRedirect: '/login'}),
  function(req, res) {
    res.redirect('/');
  });

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

app.listen(3000, function() {
  console.log('start...');
});

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}
