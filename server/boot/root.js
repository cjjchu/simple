'use strict';

const passport = require('../passport');
const app = require('../server');

module.exports = (server) => {
  // initialize for express
  app.use(passport.initialize());
  // passport session for express
  // app.use(passport.session());

  // Install a `/` route that returns server status
  const router = server.loopback.Router();

  router.get('/', server.loopback.status());

  // app routes
  router.get('/auth/sso/callback',
    // let redirect_url = req.session.originalUrl;
    passport.authenticate('openidconnect', {
      // successRedirect: '/auth/success',
      session: false,
      failureRedirect: '/auth/failure',
    }),
    (req, res) => {
      // res.send(req.user);
      if (req.user) {
        res.append('Access-Token', req.user.accessToken);
        res.append('UserEmail', req.user.email);
      }
      res.send({
        'Access-Token': req.user.accessToken,
      });
    });

  router.get('/auth/failure', (req, res) => {
    res.status(400).send('Login Failure');
  });

  router.get('/api/accounts/v1/login', passport.authenticate('openidconnect', {
    session: false,
  }));

  server.use(router);
};
