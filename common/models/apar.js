'use strict';

/**
 * @ignore  =====================================================================================
 * @file retrieve apar detail information
 * @author  shizy@cn.ibm.com
 * @copyright Copyright IBM Corp. 2013,2016. All Rights Reserved.
 * @ignore  created in 2016-07-07
 * @ignore  =====================================================================================
 */

const app = require('../../server/server');
const VError = require('verror');
const co = require('co');
const async = require('async');
const _ = require('lodash');
const logger = require('../../server/utils/logHelper').helper;
const errorHelper = require('../../server/utils/logHelper').helper;

module.exports = (Apar) => {
  Apar.disableRemoteMethodByName('find')
  Apar.disableRemoteMethodByName('findById');
  Apar.disableRemoteMethodByName('findOne');

  // disable count & exists
  Apar.disableRemoteMethodByName('confirm');
  Apar.disableRemoteMethodByName('count');
  Apar.disableRemoteMethodByName('exists');

  Apar.disableRemoteMethodByName('create');
  Apar.disableRemoteMethodByName('upsert');
  Apar.disableRemoteMethodByName('deleteById');
  Apar.disableRemoteMethodByName('updateAll');
  Apar.disableRemoteMethodByName('updateAttributes', false);
  Apar.disableRemoteMethodByName('createChangeStream');

  Apar.disableRemoteMethodByName('replaceById');
  Apar.disableRemoteMethodByName('replaceOrCreate');
  Apar.disableRemoteMethodByName('upsertWithWhere');

  // ptfs methods
  Apar.disableRemoteMethodByName('__get__ptfs');
  Apar.disableRemoteMethodByName('__count__ptfs');
  Apar.disableRemoteMethodByName('__create__ptfs');
  Apar.disableRemoteMethodByName('__delete__ptfs');
  Apar.disableRemoteMethodByName('__destroyById__ptfs');
  Apar.disableRemoteMethodByName('__findById__ptfs');
  Apar.disableRemoteMethodByName('__updateById__ptfs');

  Apar.disableRemoteMethodByName('__exists__ptfs');
  Apar.disableRemoteMethodByName('__link__ptfs');
  Apar.disableRemoteMethodByName('__unlink__ptfs');

  // pes methods
  Apar.disableRemoteMethodByName('__get__pes');
  Apar.disableRemoteMethodByName('__count__pes');
  Apar.disableRemoteMethodByName('__create__pes');
  Apar.disableRemoteMethodByName('__delete__pes');
  Apar.disableRemoteMethodByName('__destroyById__pes');
  Apar.disableRemoteMethodByName('__findById__pes');
  Apar.disableRemoteMethodByName('__updateById__pes');

  Apar.disableRemoteMethodByName('__exists__pes');
  Apar.disableRemoteMethodByName('__link__pes');
  Apar.disableRemoteMethodByName('__unlink__pes');

  // wishes methods
  Apar.disableRemoteMethodByName('__get__wishes');
  Apar.disableRemoteMethodByName('__count__wishes');
  Apar.disableRemoteMethodByName('__create__wishes');
  Apar.disableRemoteMethodByName('__delete__wishes');
  Apar.disableRemoteMethodByName('__destroyById__wishes');
  Apar.disableRemoteMethodByName('__findById__wishes');
  Apar.disableRemoteMethodByName('__updateById__wishes');

  Apar.disableRemoteMethodByName('__exists__wishes');
  Apar.disableRemoteMethodByName('__link__wishes');
  Apar.disableRemoteMethodByName('__unlink__wishes');

  // disable tags
  Apar.disableRemoteMethodByName('__get__tags');
  Apar.disableRemoteMethodByName('__count__tags');
  Apar.disableRemoteMethodByName('__create__tags');
  Apar.disableRemoteMethodByName('__delete__tags');
  Apar.disableRemoteMethodByName('__destroyById__tags');
  Apar.disableRemoteMethodByName('__findById__tags');
  Apar.disableRemoteMethodByName('__updateById__tags');

  Apar.disableRemoteMethodByName('__exists__tags');
  Apar.disableRemoteMethodByName('__link__tags');
  Apar.disableRemoteMethodByName('__unlink__tags');

  /**
   * @description
   * find the apar by aparId:
   * - get relation 'wishes' to know whether this apar is favorite of logged-in user
   * @param userId {String} a positive integer representing a valid logged-in user
   * @param aparId {String} a string representing a valid aparId, etc 'PI57857'.
   * @param cb {Function} invoked when fetching the apar succeeds or fails.  Upon
   *                   success, callback is invoked as cb(null, apar),
   *                   where `apar` is a Model Apar object.  Upon failure,
   *                   callback is invoked as cb(err) instead.
   * @throws {Error} aparId does not match regular expression '^P[A-Z]\d{5}$'
   *                  or userId does not match regular expression '^\d+$'
                      (err1)
             {Error} apar not found (err2)
   *         {Error} error while find/update from data source, etc, TIMEOUT, ECONNREFUSED
   * @returns void
   */

  Apar.findByAparId_v1 = (aparId, req, cb) => {
    console.log(aparId)
    req.user={"id":'34'};
    const userId = req.user.id;
    const reUserId = /^\d+$/;
    const reAparId = /^P[A-Z]\d{5}$/;

    const UserNotice = app.models.UserNotice;
    const Notice = app.models.Notice;
    // const Wish = app.models.Wish;

    co(function* doFindByAparId() {
      // unacceptable params and return 400
      if (!reAparId.test(aparId) || !reUserId.test(userId)) {
        const err1 = new Error('Invalid aparId or userId');
        err1.statusCode = 400;
        err1.code = 'PARAMETERS_INVALID';
        throw err1;
      }

      const apar = yield Apar.findOne({
        where: {
          aparId,
        },
        include: [
          'ptfs',
          'pes',
          {
            relation: 'wishes',
            scope: {
              where: {
                ownerId: userId,
              },
            },
          },
        ],
      });

      if (!apar) {
        const err2 = new Error('Apar not found');
        err2.statusCode = 400;
        err2.code = 'APAR_NOT_FOUND';
        throw err2;
      }

      // favorite attribute
      if (apar.wishes().length === 1) {
        apar.favorite = true;
      } else {
        apar.favorite = false;
      }

      // set user-notice isRead true
      const ntf = yield Notice.findOne({
        where: {
          aparId,
        },
      });

      if (ntf) {
        const un = yield UserNotice.findOne({
          where: {
            ownerId: userId,
            noticeId: ntf.id,
          },
        });
        if (un && !un.isRead) {
          yield un.updateAttributes({
            isRead: true,
          });
        }
      }

      return apar;
    }).then((val) => {
      cb(null, val);
    }, (err) => {
      const error = new VError(err, 'Apar Find By AparId Error');
      logger.writeErr(JSON.stringify(error), error.stack);
      cb(errorHelper.formatError(err));
    });
  };

  Apar.remoteMethod(
    'findByAparId_v1', {
      accepts: [{
        arg: 'aparId',
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
        path: '/v1/me/:aparId',
        verb: 'get',
      },
    }
  );

  Apar.search_v1 = (keywords, limitNum, skipNum, cb) => {
    if (!keywords) return cb(null, []);
    // const query = url.parse(req.url, true).query;
    const limit = limitNum || 20;
    const skip = skipNum || 0;

    const functions = [];
    const initKeys = keywords.split(' ');

    for (let i = 0; i < initKeys.length; i += 1) {
      functions.push((callback) => {
        app.si.match({
          beginsWith: initKeys[i].toLowerCase(),
          limit: 10,
        }, (err, matches) => {
          if (err) {
            callback(err);
          }
          callback(null, matches);
        });
      });
    }

    async.parallel(functions, (err, keyResults) => {
      if (err) cb(errorHelper.formatError(err));

      const searchKeys = _.flatten(keyResults);
      // const keys = searchKeys.map((value) => (`{"AND":{"*":["${value.toLowerCase()}"]}}`));
      const keys = searchKeys.map((value) =>
        (`{"AND":{"aparId":["${value.toLowerCase()}"]},"boost":10},\
          {"AND":{"abstract":["${value.toLowerCase()}"]}},\
          {"AND":{"description":["${value.toLowerCase()}"]}},\
          {"AND":{"triggers":["${value.toLowerCase()}"]}},\
          {"AND":{"summary":["${value.toLowerCase()}"]}},\
          {"AND":{"conclusion":["${value.toLowerCase()}"]}}`));
      if (keys.length === 0) return cb(null, []);

      const q = `{"query":[${keys.join(',')}],"offset":${skip},"pageSize":${limit}}`;
      // console.log(keys);

      app.si.search(JSON.parse(q), (err1, results) => {
        if (err1) {
          const error = new VError(err1, 'Apar Search Error');
          logger.writeErr(JSON.stringify(error), error.stack);
          cb(errorHelper.formatError(err1));
        }

        if (results.totalHits === 0) return cb(null, []);

        const searchApars = [];
        for (let i = 0; i < results.hits.length; i += 1) {
          searchApars.push({
            id: results.hits[i].document.id,
            aparId: results.hits[i].document.aparId,
            score: results.hits[i].score,
            abstract: results.hits[i].document.abstract,
            closeDate: results.hits[i].document.closeDate,
          });
        }
        return cb(null, searchApars);
      });
      return true;
    });
    return true;
  };

  Apar.remoteMethod(
    'search_v1', {
      accepts: [{
        arg: 'keywords',
        type: 'string',
      }, {
        arg: 'limit',
        type: 'number',
      }, {
        arg: 'skip',
        type: 'number',
      }],
      returns: {
        type: 'array',
        root: true,
      },
      http: {
        path: '/v1/search',
        verb: 'get',
      },
    }
  );
  /*
      Apar.testSearch = function(cb) {
          Apar.find({
              where: {
                  and: [{
                      lastUpdated: null
                  }, {
                      or: [{
                          hiper: true
                      }, {
                          pe: true
                      }]
                  }]
              }
          }, function(err, apars) {
              if (err)
                  console.log(err);
              cb(null, apars);
          });
      }

      Apar.remoteMethod(
          'testSearch', {
              returns: {
                  type: 'object',
                  'root': true
              },
              http: {
                  path: '/findbyhiperpe',
                  verb: 'get'
              }
          }
      );
  */
};
