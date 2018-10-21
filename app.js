const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var url = 'mongodb://localhost:27017/POLLR';
const poll = require('./routes/polls.js');
const user = require('./routes/users.js');

initializeApp(app);

app.get('/', (req, res) => { 
	console.log(req["query"]["id"]);
	if (req["query"]["id"] !== undefined) {
		res.sendfile("./views/votes.html");
	} else {
		res.sendfile("./views/index.html");
	}
});

app.get('/test', (req, res) => {
    res.send("test");
});

app.get('/login', (req, res) => {
	res.sendFile(__dirname + "/views/login.html");
})

app.get('/signup', (req, res) => {
	res.sendFile(__dirname + "/views/signup.html");
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


function initializeApp(app){
    mongoose.connect(url,{ useNewUrlParser: true });
    app.use('/polls', poll);
    app.use('/', express.static(__dirname));
    app.use('/users', user);
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));
}