var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
        username: String,
        password: String,
        pollsCreated: [String],
        pollsVoted: [String]
    },
    { versionKey: false }
);

var User = mongoose.model('users', UserSchema, 'users');

module.exports = User;