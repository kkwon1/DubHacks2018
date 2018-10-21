var express = require('express');
var router = express.Router();
var Poll = require('../models/Poll.js');
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
            choices: req.body.choices
        });
        poll.save();
        console.log("poll has been saved");
        console.log(poll);
        res.status(201).send(poll);
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

module.exports = router;