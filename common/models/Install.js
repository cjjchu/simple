'use strict';

/**
 * @ignore  =====================================================================================
 * @file add or update device
 * @author  fjb@cn.ibm.com
 * @copyright Copyright IBM Corp. 2013,2016. All Rights Reserved.
 * @ignore  created in 2016-07-21
 * @ignore  =====================================================================================
 */

const co = require('co');
const VError = require('verror');
const logger = require('../../server/utils/logHelper').helper;
const errorHelper = require('../../server/utils/logHelper').helper;

module.exports = (Install) => {
  // disable find
  Install.disableRemoteMethod('find', true);
  Install.disableRemoteMethod('findById', true);
  Install.disableRemoteMethod('findOne', true);
  Install.disableRemoteMethod('findByApp', true);
  Install.disableRemoteMethod('findByUser', true);
  Install.disableRemoteMethod('findBySubscriptions', true);

  // disable count & exists
  Install.disableRemoteMethod('confirm', true);
  Install.disableRemoteMethod('count', true);
  Install.disableRemoteMethod('exists', true);

  Install.disableRemoteMethod('login', true);
  Install.disableRemoteMethod('create', true);
  Install.disableRemoteMethod('upsert', true);
  Install.disableRemoteMethod('deleteById', true);
  Install.disableRemoteMethod('updateAll', true);
  Install.disableRemoteMethod('updateAttributes', false);
  Install.disableRemoteMethod('createChangeStream', true);

  Install.disableRemoteMethod('replaceById', true);
  Install.disableRemoteMethod('replaceOrCreate', true);
  Install.disableRemoteMethod('upsertWithWhere', true);

  Install.addOrUpdate_v1 = (install, req, cb) => {
    let tx;
    logger.writeInfo(`${install.deviceId} ${install.userId}`);

    co(function* doAddOrUpdate() {
      tx = yield Install.beginTransaction({
        isolationLevel: Install.Transaction.READ_COMMITTED,
      });

      const installToFind = yield Install.findOne({
        where: {
          // deviceId: install.deviceId,
          userId: install.userId,
        },
      });

      let installCreated;
      if (!installToFind) {
        logger.writeInfo('creating new Install ');
        installCreated = yield Install.create(install, {
          transaction: tx,
        });
      } else {
        logger.writeInfo('updating existed Install');
        installCreated = yield installToFind.updateAttributes(install);
      }

      return installCreated;
    }).then((val) => {
      tx.commit();
      cb(null, val);
    }, (err) => {
      if (tx) {
        tx.rollback();
      }
      const error = new VError(err, 'Add or Update Device Error');
      logger.writeErr(JSON.stringify(error), error.stack);

      cb(errorHelper.formatError(err));
    });
  };

  Install.remoteMethod(
    'addOrUpdate_v1', {
      accepts: [{
        arg: 'install',
        type: 'Install',
        http: {
          source: 'body',
        },
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
        path: '/v1/addOrUpdate',
        verb: 'post',
        status: 200,
      },
    }
  );
};
