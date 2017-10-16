module.exports = function(app) {

  /*
  *
"mongodb": {
  "host": "localhost",
    "port": 27017,
    "url": "mongodb://localhost:27017/simple",
    "database": "simple",
    "name": "mongodb",
    "connector": "mongodb"
},
*/


  var mongoDs = app.dataSources.db;
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


// module.exports = function(app) {
//   var User = app.models.user;
//   var Role = app.models.Role;
//   var RoleMapping = app.models.RoleMapping;
//   var Team = app.models.Team;
//
//   User.create([
//     {username: 'John', email: 'john@doe.com', password: 'opensesame'},
//     {username: 'Jane', email: 'jane@doe.com', password: 'opensesame'},
//     {username: 'Bob', email: 'bob@projects.com', password: 'opensesame'}
//   ], function(err, users) {
//     if (err) throw err;
//
//     console.log('Created users:', users);
//
//     // create project 1 and make john the owner
//     users[0].projects.create({
//       name: 'project1',
//       balance: 100
//     }, function(err, project) {
//       if (err) throw err;
//
//       console.log('Created project:', project);
//
//       // add team members
//       Team.create([
//         {ownerId: project.ownerId, memberId: users[0].id},
//         {ownerId: project.ownerId, memberId: users[1].id}
//       ], function(err, team) {
//         if (err) throw err;
//
//         console.log('Created team:', team);
//       });
//     });
//
//     //create project 2 and make jane the owner
//     users[1].projects.create({
//       name: 'project2',
//       balance: 100
//     }, function(err, project) {
//       if (err) throw err;
//
//       console.log('Created project:', project);
//
//       //add team members
//       Team.create({
//         ownerId: project.ownerId,
//         memberId: users[1].id
//       }, function(err, team) {
//         if (err) throw err;
//
//         console.log('Created team:', team);
//       });
//     });
//
//     //create the admin role
//     Role.create({
//       name: 'admin'
//     }, function(err, role) {
//       if (err) throw err;
//
//       console.log('Created role:', role);
//
//       //make bob an admin
//       role.principals.create({
//         principalType: RoleMapping.USER,
//         principalId: users[2].id
//       }, function(err, principal) {
//         if (err) throw err;
//
//         console.log('Created principal:', principal);
//       });
//     });
//   });
// };

