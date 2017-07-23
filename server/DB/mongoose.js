const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
var connection = mongoose.createConnection('mongodb://localhost:27017/TodoApp?poolSize=4');

// var newUser = new User({
//     email: 'orbanbalazs@me.com'
// });

// newUser.save()
// .then( (doc) => {
//     console.log('Saved: ' + '\r\n' + doc);
// })
// .catch( (e) => {
//     console.log(e);
// });

module.exports = {
    connection
};