var mongoose = require('mongoose');

var PollSchema = new mongoose.Schema({
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