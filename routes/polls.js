var express = require('express');
var router = express.Router();
var Poll = require('../models/Poll.js');
var Choice = require("../domain_models/Choice.js");
var geoCalculator = require('../services/geoCalculator.js');
var calculator = new geoCalculator();
var bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

// get every single stored poll
router.route("/")
    .get((req, res) => {
        Poll.find().exec()
        .then(polls => {
            res.status(200).send(polls);
        })
        .catch(err => {
            res.status(400).send(err)
        });
    })
    .post((req, res) => {
        var poll = new Poll({
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            prompt: req.body.prompt,
            choices: []
        });
        poll.save();
        console.log("poll has been saved");
        console.log(poll);
        res.status(201).send(poll);
    })
    .put((req, res) => {
        var type = req.body.type;
        switch(type){
            case("insert"):
                console.log("inserting new choice");
                insertChoice(req, res);
                break;
            default:
                console.log("invalid type");
        }
    })

// returns all the "valid" polls (within certain radius)
router.route("/valid")
    .get((req, res) => {
        var query = req.query;
        var lat, long;
        if (query) {
            lat = query.lat;
            long = query.long;
        }
        Poll.find().exec()
        .then(polls => {
            var validPolls = calculator.getAllValidPolls(polls, lat, long);
            res.status(200).send(validPolls);   
        })
        .catch(err => {
            res.status(400).send(err)
        });
    })


// TODO:should prompt be unique?
function insertChoice(req, res){
    var choice = new Choice(req.body.descriptor, 0);
    Poll.findOneAndUpdate(
        {"prompt": req.body.prompt},
        { $push: { "choices": choice}},
        function(err, data){
            if(err != null){
                console.log(err);
            }
        })

    res.status(201).send(choice);
    console.log("Successfully inserted the choice");
}

module.exports = router;