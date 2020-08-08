const express = require("express");
const bodyParser = require('body-parser'); 
const path = require('path'); 
const fs = require('fs'); 
const cors = require("cors"); 
var routes = require('./models/index');
// var sms = require('./plugins/sms');
const app = express();
app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

 
// app.use((req, res, next) => {
// 	res.header("Access-Control-Allow-Origin", "https://admin-commerce.herokuapp.com"); 
// 	res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,Authorization");
// 	if (req.method === 'OPTIONS') {
// 		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET, OPTIONS');
// 		return res.status(200).json({});
// 	}
// 	next();
// });

app.use('/api', routes); 
app.get('/', (req,res) => { 
 res.writeHead(200, {'Content-Type': 'text/plain'});
    var message = 'It works ooo!\n',
        version = 'NodeJS ' + process.versions.node + '\n',
        response = [message, version].join('\n');
    res.end(response);
})
 
// Define PORT
const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
    console.log('Connected to port ' + port);
    // var dos = slug.split(" ").forEach()
})

 