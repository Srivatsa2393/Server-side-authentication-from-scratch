//import the user model
const User = require('../models/user');

//logic to process a request
exports.signup = function(req, res, next){
  // res.send({ success: 'true' });
  //console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;

  //See if a user with given email exists
  User.findOne({ email: email }, function(err, existingUser) {
    
  });

  //If a user with email does exist, return an error

  //if a user with email does not exist create and save user record

  //Respond to request indicating the user was created
}
