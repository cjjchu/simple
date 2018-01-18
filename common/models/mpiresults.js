'use strict';

let mpi = require('../../server/controller/mpiresults/results');
module.exports = (MPIresults) => {
  MPIresults.disableRemoteMethodByName('find')
  MPIresults.disableRemoteMethodByName('findById');
  MPIresults.disableRemoteMethodByName('findOne');

  // disable count & exists
  MPIresults.disableRemoteMethodByName('confirm');
  MPIresults.disableRemoteMethodByName('count');
  MPIresults.disableRemoteMethodByName('exists');

  MPIresults.disableRemoteMethodByName('create');
  MPIresults.disableRemoteMethodByName('upsert');
  MPIresults.disableRemoteMethodByName('deleteById');
  MPIresults.disableRemoteMethodByName('updateAll');
  MPIresults.disableRemoteMethodByName('updateAttributes');
  MPIresults.disableRemoteMethodByName('createChangeStream');

  MPIresults.disableRemoteMethodByName('replaceById');
  MPIresults.disableRemoteMethodByName('replaceOrCreate');
  MPIresults.disableRemoteMethodByName('upsertWithWhere');

  // ptfs methods
  MPIresults.disableRemoteMethodByName('__get__ptfs');
  MPIresults.disableRemoteMethodByName('__count__ptfs');
  MPIresults.disableRemoteMethodByName('__create__ptfs');
  MPIresults.disableRemoteMethodByName('__delete__ptfs');
  MPIresults.disableRemoteMethodByName('__destroyById__ptfs');
  MPIresults.disableRemoteMethodByName('__findById__ptfs');
  MPIresults.disableRemoteMethodByName('__updateById__ptfs');

  MPIresults.disableRemoteMethodByName('__exists__ptfs');
  MPIresults.disableRemoteMethodByName('__link__ptfs');
  MPIresults.disableRemoteMethodByName('__unlink__ptfs');

  // pes methods
  MPIresults.disableRemoteMethodByName('__get__pes');
  MPIresults.disableRemoteMethodByName('__count__pes');
  MPIresults.disableRemoteMethodByName('__create__pes');
  MPIresults.disableRemoteMethodByName('__delete__pes');
  MPIresults.disableRemoteMethodByName('__destroyById__pes');
  MPIresults.disableRemoteMethodByName('__findById__pes');
  MPIresults.disableRemoteMethodByName('__updateById__pes');

  MPIresults.disableRemoteMethodByName('__exists__pes');
  MPIresults.disableRemoteMethodByName('__link__pes');
  MPIresults.disableRemoteMethodByName('__unlink__pes');

  // wishes methods
  MPIresults.disableRemoteMethodByName('__get__wishes');
  MPIresults.disableRemoteMethodByName('__count__wishes');
  MPIresults.disableRemoteMethodByName('__create__wishes');
  MPIresults.disableRemoteMethodByName('__delete__wishes');
  MPIresults.disableRemoteMethodByName('__destroyById__wishes');
  MPIresults.disableRemoteMethodByName('__findById__wishes');
  MPIresults.disableRemoteMethodByName('__updateById__wishes');

  MPIresults.disableRemoteMethodByName('__exists__wishes');
  MPIresults.disableRemoteMethodByName('__link__wishes');
  MPIresults.disableRemoteMethodByName('__unlink__wishes');

  // disable tags
  MPIresults.disableRemoteMethodByName('__get__tags');
  MPIresults.disableRemoteMethodByName('__count__tags');
  MPIresults.disableRemoteMethodByName('__create__tags');
  MPIresults.disableRemoteMethodByName('__delete__tags');
  MPIresults.disableRemoteMethodByName('__destroyById__tags');
  MPIresults.disableRemoteMethodByName('__findById__tags');
  MPIresults.disableRemoteMethodByName('__updateById__tags');

  MPIresults.disableRemoteMethodByName('__exists__tags');
  MPIresults.disableRemoteMethodByName('__link__tags');
  MPIresults.disableRemoteMethodByName('__unlink__tags');

  MPIresults.resultV2 = function(release, subRelease, meplId, cb) {
    if (release !== '' && subRelease !== '' && meplId !== '' && release !== null && subRelease !== null && meplId !== null && release !== undefined && subRelease !== undefined && meplId !== undefined) {
      mpi.result(release, subRelease, meplId, function(hiper, peres, inconsistentres) {
        let result = {};
        result.hiper = hiper;
        result.peres = peres;
        result.inconsistentres = inconsistentres;
        // console.log(result);
        cb(null, result);
      });
    } else {
      let result = {};
      result.hiper = [];
      result.peres = [];
      result.inconsistentres = [];
      cb(null, result);
    }
  };
  MPIresults.remoteMethod(
    'resultV2', {
      accepts: [{
        arg: 'release',
        type: 'string',
        required: true,
      }, {
        arg: 'subRelease',
        type: 'string',
      }, {
        arg: 'meplId',
        type: 'string',
      }],
      returns: {
        type: 'object',
        root: true,
      },
      http: {
        path: '//',
        verb: 'get',
      },
    }
  );
};
