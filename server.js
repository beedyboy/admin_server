const express = require("express");
const bodyParser = require('body-parser'); 
const path = require('path'); 
const fs = require('fs'); 
var cors = require('cors'); 
var routes = require('./models/index');
// var sms = require('./plugins/sms');
const app = express();

// enables cors
app.use(cors({
  'allowedHeaders': ['sessionId', 'Content-Type', 'X-Requested-With', 'Accept', 'Authorization'],
  'exposedHeaders': ['sessionId'],
  'origin': '*',
  'methods': 'OPTIONS,GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// app.options('*', cors());

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

 