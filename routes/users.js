var express = require('express');
var userRouter = express.Router();
var User = require('../schemas/User.js');    
const bodyParser = require('body-parser');

userRouter.use(bodyParser.json());
userRouter.use(bodyParser.urlencoded({extended:true}));

// GET: get every user in the database
// POST: Add a new user into the database
userRouter.route('/')
    .get((req, res) => {
        var query = req.query;
        User.find(query).exec()
        .then(users => res.status(200).json(users))
        .catch(err => res.status(400).send(err));
    })
    .post((req, res) => {
        var user = new User({
            username: req.body.username,
            password: req.body.password,
            pollsCreated: [],
            pollsVoted: []
        });
        user.save();
        console.log("Saved user: ");
        console.log(user);
        res.status(201).send(user);
    })
    .put((req, res) => {
        var type = req.body.type;
        updateUserPolls(req, res, type);
    })

userRouter.route('/usernames')
    .get((req, res) => {
        User.find({}, {username:1}).exec()
        .then(users => res.status(200).json(users))
        .catch(err => res.status(400).send(err));
    })

function updateUserPolls(req, res, type) {
    var listToUpdate = "pollsCreated";
    if (type === "vote") {
        listToUpdate = "pollsVoted";
    }

    User.findOneAndUpdate(
        { "username": req.body.username }, 
        { $push: { [listToUpdate]: req.body.pollId } },
        function(err, data){
            if(err != null){
                console.log(err);
            }
        })

    res.status(201).send(req.body.pollId);
    console.log("Successfully saved poll Id");
}

module.exports = userRouter;