var express = require('express');
var router = express.Router();
var Poll = require('../models/Poll.js');
var geoCalculator = require("../services/geoCalculator");
var bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

// get every single stored poll, then return the valid polls
router.route("/")
    .get((req, res) => {
        var query = req.query;
        var lat, long;
        if (query) {
            lat = query.lat;
            long = query.long;
        }
        var calc = new geoCalculator();
        Poll.find().exec()
        .then(polls => {
            var validPolls = calc.getAllValidPolls(polls, lat, long);
            res.status(200).send(validPolls);   
        })
        .catch(err => {
            res.status(400).send(err)
        });
    })

module.exports = router;