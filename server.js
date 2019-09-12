// const express     = require ('express');
// const MongoClient = require('mongodb').MongoClient;
// const bodyParser  = require('body-parser');
// const db		  = require('./config/db');

// const app		  = express();

// const port = 8000;

// app.use(bodyParser.urlencoded({ extended: true }))



// MongoClient.connect(db.url, {authMechanism: 'ScramSHA1'}, (err, database) => {
// 	if (err) return console.log(err)
// 	require('./app/routes')(app, database);
// 	app.listen(port, () => {
// 		console.log("We are live on " + port);
// 	})

// })

// part 2


const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port);