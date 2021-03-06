const jwt = require('jwt-simple');

//importing user model
const User = require('../models/user');

const config = require('../config');

// make a function that is going to take a users id
function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next) {
    //User has already had email, password auth'd
    // we just need to give them a token
    res.send({ token: tokenForUser(req.user) });
}



//logic to process a request
exports.signup = function(req, res, next) {
    /* res.send({ success: 'true' }); */

    //console.log(req.body);

    const email = req.body.email;
    const password = req.body.password;


    if (!email || !password){
        return res.status(422).send({ error: 'You must provide a email and password' });
    }

    //See if a user with the given email exists
    User.findOne({ email: email }, function(err, existingUser) {

        if (err){
            return next(err);
        }

    // If a user with email does exist return an error

        if (existingUser){
            return res.status(422).send({ error: 'Email is in use'});
        }

        //If a user with email does not exist, create and save user record
        const user = new User({
            email: email,
            password: password
        });

        //to save the new user to the db
        user.save(function(err) {
            if (err) {
                return next(err);
            }
        });
        

        //Respond to request indicating the user was created
        res.json({ token: tokenForUser(user) });

    });


}