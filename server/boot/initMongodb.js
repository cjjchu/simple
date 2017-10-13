module.exports = function(app) {
  var mongoDs = app.dataSources.mongodb;
  var Luser = app.models.Luser;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;
 var AccessToken=app.models.AccessToken;

  // mongoDs.automigrate('AccessToken', function(err){
  //   if(err) throw err;
  // });

  mongoDs.automigrate('Luser', function(err){
    if(err) throw err;
    Luser.create([{
      username:"a",
      password:"a",
      email:"a@a.com"

    }])
    Luser.create([
      {
        username: 'admin', email: 'admin@e.com', password: '123456', emailVerified: true}
    ], function(err, users) {
      if (err) throw err;
      mongoDs.automigrate('Role', function(err){
        if(err) throw err;

        mongoDs.automigrate('RoleMapping', function(err){
          if(err) throw err;
          var userid = users[0].id;
          Role.create({
            name: 'admin'
          }, function(err, role) {
            console.log('Created role:', role);

            role.principals.create({
              principalType: RoleMapping.USER
              , principalId: userid
            }, function(err, principal) {
              if (err) throw err;
              console.log('Created principal:', principal);
            });
          });
        });
      });
    });
  });
};
