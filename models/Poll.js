var mongoose = require('mongoose');

var PollSchema = new mongoose.Schema({
        _id: String,
        latitude: Number,
        longitude: Number,
        prompt: String,
        choices: [{
            descriptor: String,
            votes: Number
        }]
    },
    { versionKey: false }
);

var Poll = mongoose.model('polls', PollSchema, 'polls');

module.exports = Poll;