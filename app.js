const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var url = 'mongodb://localhost:27017/POLLR';
const poll = require('./routes/polls.js');

initializeApp(app);

app.get('/', (req, res) => { 
    res.send('Hello World!')
});

app.get('/test', (req, res) => {
    res.send("test");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


function initializeApp(app){
	mongoose.connect(url,{ useNewUrlParser: true });
	app.use('/polls', poll);
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));
}