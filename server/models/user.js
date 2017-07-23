const {connection} = require('../DB/mongoose');

var User = connection.model('Users', {
    email: {
        type: String,
        required: true,
        minlength: 5,
        trim: true
    }
});

module.exports = {
    User
};