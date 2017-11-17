'use strict';

module.exports = function(Luser) {
  Luser.disableRemoteMethodByName('find');
  Luser.disableRemoteMethodByName('findById');
  Luser.disableRemoteMethodByName('findOne');

  // disable count & exists
  Luser.disableRemoteMethodByName('confirm');
  Luser.disableRemoteMethodByName('count');
  Luser.disableRemoteMethodByName('exists');

  Luser.disableRemoteMethodByName('login');
  Luser.disableRemoteMethodByName('logout');
  Luser.disableRemoteMethodByName('create');
  Luser.disableRemoteMethodByName('upsert');
  Luser.disableRemoteMethodByName('deleteById');
  Luser.disableRemoteMethodByName('updateAll');
  Luser.disableRemoteMethodByName('updateAttributes');
  Luser.disableRemoteMethodByName('createChangeStream');

  Luser.disableRemoteMethodByName('replaceById');
  Luser.disableRemoteMethodByName('replaceOrCreate');
  Luser.disableRemoteMethodByName('upsertWithWhere');

};
