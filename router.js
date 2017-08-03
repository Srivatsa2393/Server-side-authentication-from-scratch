const Authentication = require('./controllers/authentication');

/*  module.exports = function(app) {
    app.get('/', function(req, res, next) {
        res.send(['get a job', 'take care of your parents']);
    })
}  */

module.exports = function(app) {
    app.post('/signup', Authentication.signup);
}