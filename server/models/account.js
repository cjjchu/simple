  'use strict';

  /**
   * @ignore  =====================================================================================
   * @file account register and login
   * @author  shizy@cn.ibm.com
   * @copyright Copyright IBM Corp. 2013,2016. All Rights Reserved.
   * @ignore  created in 2016-07-07
   * @ignore  =====================================================================================
   */

  const VError = require('verror');
  // reference: https://docs.strongloop.com/display/public/LB/Working+with+LoopBack+objects
  const app = require('../../server/server');
  // const loopback = require('loopback');
  const co = require('co');
  const _ = require('lodash');
  const logger = require('../utils/logHelper').helper;
  const errorHelper = require('../utils/errorHelper').helper;
  // const passport = require('passport');

  module.exports = (Account) => {
    // disable find
    Account.disableRemoteMethod('find', true);
    Account.disableRemoteMethod('findById', true);
    Account.disableRemoteMethod('findOne', true);

    // disable count & exists
    Account.disableRemoteMethod('confirm', true);
    Account.disableRemoteMethod('count', true);
    Account.disableRemoteMethod('exists', true);

    Account.disableRemoteMethod('login', true);
    Account.disableRemoteMethod('logout', true);
    Account.disableRemoteMethod('create', true);
    Account.disableRemoteMethod('upsert', true);
    Account.disableRemoteMethod('deleteById', true);
    Account.disableRemoteMethod('updateAll', true);
    Account.disableRemoteMethod('updateAttributes', false);
    Account.disableRemoteMethod('createChangeStream', true);

    Account.disableRemoteMethod('replaceById', true);
    Account.disableRemoteMethod('replaceOrCreate', true);
    Account.disableRemoteMethod('upsertWithWhere', true);

    // instance methods
    Account.disableRemoteMethod('__count__accessTokens', false);
    Account.disableRemoteMethod('__create__accessTokens', false);
    Account.disableRemoteMethod('__delete__accessTokens', false);
    Account.disableRemoteMethod('__destroyById__accessTokens', false);
    Account.disableRemoteMethod('__findById__accessTokens', false);
    Account.disableRemoteMethod('__get__accessTokens', false);
    Account.disableRemoteMethod('__updateById__accessTokens', false);

    Account.disableRemoteMethod('__get__notices', false);
    Account.disableRemoteMethod('__count__notices', false);
    Account.disableRemoteMethod('__create__notices', false);
    Account.disableRemoteMethod('__delete__notices', false);
    Account.disableRemoteMethod('__destroyById__notices', false);
    Account.disableRemoteMethod('__findById__notices', false);
    Account.disableRemoteMethod('__updateById__notices', false);

    Account.disableRemoteMethod('__exists__notices', false);
    Account.disableRemoteMethod('__link__notices', false);
    Account.disableRemoteMethod('__unlink__notices', false);

    // disable wishes
    Account.disableRemoteMethod('__get__wishes', false);
    Account.disableRemoteMethod('__count__wishes', false);
    Account.disableRemoteMethod('__create__wishes', false);
    Account.disableRemoteMethod('__delete__wishes', false);
    Account.disableRemoteMethod('__destroyById__wishes', false);
    Account.disableRemoteMethod('__findById__wishes', false);
    Account.disableRemoteMethod('__updateById__wishes', false);

    Account.disableRemoteMethod('__exists__wishes', false);
    Account.disableRemoteMethod('__link__wishes', false);
    Account.disableRemoteMethod('__unlink__wishes', false);

    // disable tags
    Account.disableRemoteMethod('__get__tags', false);
    Account.disableRemoteMethod('__count__tags', false);
    Account.disableRemoteMethod('__create__tags', false);
    Account.disableRemoteMethod('__delete__tags', false);
    Account.disableRemoteMethod('__destroyById__tags', false);
    Account.disableRemoteMethod('__findById__tags', false);
    Account.disableRemoteMethod('__updateById__tags', false);

    Account.disableRemoteMethod('__exists__tags', false);
    Account.disableRemoteMethod('__link__tags', false);
    Account.disableRemoteMethod('__unlink__tags', false);

    Account.logoff_v1 = (deviceId, req, cb) => {
      // console.log('Hello World');
      const Install = app.models.Install;

      // got access token
      // let ctx = loopback.getCurrentContext();
      // let accessToken = ctx.get('accessToken');

      const userId = req.user.id;
      // const accessToken = req.user.accessToken;

      let tx;
      co(function* doLogOff() {
        const account = yield Account.findById(userId);
        if (!account) {
          const err1 = new Error('User not found');
          err1.statusCode = 400;
          err1.code = 'USER_NOT_FOUND';
          throw err1;
        }

        tx = yield Account.beginTransaction({
          isolationLevel: Account.Transaction.READ_COMMITTED,
        });

        yield Install.destroyAll({
          // TODO: should be accessToken.userId
          userId: account.email,
          // deviceId,
        }, {
          transaction: tx,
        });

        // yield Account.logout(accessToken.id);
        yield account.updateAttributes({
          accessToken: null,
          refreshToken: null,
          lastUpdated: null,
          ttl: 0,
        }, {
          transaction: tx,
        });

        return true;
      }).then((val) => {
        tx.commit();
        cb(null, val);
      }, (err) => {
        if (tx) {
          tx.rollback();
        }
        const error = new VError(err, 'Account Logout Error');
        logger.writeErr(JSON.stringify(error), error.stack);
        cb(errorHelper.formatError(err));
      });
    };

    Account.remoteMethod(
      'logoff_v1', {
        accepts: [{
          arg: 'deviceId',
          type: 'string',
          required: true,
        }, {
          arg: 'req',
          type: 'object',
          http: {
            source: 'req',
          },
        }],
        returns: {
          type: 'object',
          root: true,
        },
        http: {
          path: '/v1/logout/:deviceId',
          verb: 'post',
          status: 204,
        },
      }
    );

    /**
     * @description
     * find and returns the tags belong to specific user
     * @param req {Request} The req object represents the HTTP request.
     * @param cb {Function} invoked when fetching succeeds or fails.  Upon
     *                   success, callback is invoked as cb(null, tags),
     *                   Upon failure, callback is invoked as cb(err) instead.
     * @throws void
     * @returns void
     */
    Account.getTags_v1 = function getTags(req, cb) {
      const Tag = app.models.Tag;
      const userId = req.user.id;

      co(function* doGetTags() {
        // get user by userId
        const account = yield Account.findById(userId);

        if (!account) {
          const err1 = new Error('User not found');
          err1.code = 'USER_NOT_FOUND';
          throw err1;
        }

        // get all tags include user
        const tags = yield Tag.find({
          order: 'production DESC',
          include: {
            relation: 'users',
            scope: {
              where: {
                email: account.email,
              },
            },
          },
        });

        const result = _.map(tags, (tag) => {
          tag.status = !(tag.users().length > 0);
          return tag;
        });

        return result;
      }).then((val) => {
        cb(null, val);
      }, (err) => {
        const error = new VError(err, 'Get Tags by User Error');
        logger.writeErr(JSON.stringify(error), error.stack);
        cb(errorHelper.formatError(err));
      });
    };

    Account.remoteMethod(
      'getTags_v1', {
        accepts: [{
          arg: 'req',
          type: 'object',
          http: {
            source: 'req',
          },
        }],
        returns: {
          type: 'array',
          root: true,
        },
        http: {
          path: '/v1/me/tags',
          verb: 'get',
        },
      }
    );

    /**
     * @description
     * update user's tags which indicates the type of notifications user want to receive
     * - update or create tag item if user unselected, delete tag item if user selected
     * @param userTags {Array} The tags user selected or unselected.
     * @param req {Request} The req object represents the HTTP request.
     * @param cb {Function} invoked when updating succeeds or fails.  Upon
     *                   success, callback is invoked as cb(null, true),
     *                   Upon failure, callback is invoked as cb(err) instead.
     * @throws void
     * @returns void
     */
    Account.updateTags_v1 = (userTags, req, cb) => {
      const UserTag = app.models.UserTag;
      const Tag = app.models.Tag;
      const userId = req.user.id;

      let tx;
      co(function* doUpdateTags() {
        tx = yield UserTag.beginTransaction({
          isolationLevel: UserTag.Transaction.READ_COMMITTED,
        });

        // get user by userId
        const account = yield Account.findById(userId);
        if (!account) {
          const err1 = new Error('User not found');
          err1.code = 'USER_NOT_FOUND';
          throw err1;
        }

        // delete all existing user's record
        yield UserTag.destroyAll({
          ownerId: userId,
        }, {
          transaction: tx,
        });

        // get all tags
        const tags = yield Tag.find();

        const inverseTags = [];
        _.map(userTags, (o) => {
          // check input id, production and tagName
          const t = _.find(tags, {
              production: o.production,
              tagName: o.tagName,
            });

          if (!t) {
            const err = new Error('Tag not found');
            err.statusCode = 400;
            err.code = 'TAG_NOT_FOUND';
            throw err;
          }

          if (!o.status) {
            inverseTags.push({
              ownerId: account.id,
              tagId: t.id,
            });
          }
        });

        yield UserTag.create(inverseTags, {
          transaction: tx,
        });

        return true;
      }).then((val) => {
        tx.commit();
        cb(null, val);
      }, (err) => {
        if (tx) {
          tx.rollback();
        }
        const error = new VError(err, 'Upate user\'s tags Error');
        logger.writeErr(JSON.stringify(error), error.stack);
        cb(errorHelper.formatError(err));
      });
    };

    Account.remoteMethod(
      'updateTags_v1', {
        accepts: [{
          arg: 'tags',
          type: 'array',
          required: true,
        }, {
          arg: 'req',
          type: 'object',
          http: {
            source: 'req',
          },
        }],
        returns: {
          type: 'object',
          root: true,
        },
        http: {
          path: '/v1/me/tags',
          verb: 'post',
          status: 204,
        },
      }
    );
  };
