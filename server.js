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
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api', routes); 
app.get('/', (req,res) => { 
  res.send(`Home Page `);
})


// Define PORT
const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
    console.log('Connected to port ' + port)
})

 