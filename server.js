const express = require("express");
const bodyParser = require('body-parser'); 
const path = require('path'); 
const fs = require('fs'); 
// const cors = require("cors"); 
var routes = require('./models/index');
// var sms = require('./plugins/sms');
const app = express();

// app.use(cors());

// app.options('*', cors());

 
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");  
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//     next();
//   }); 
// app.use((req, res, next) => {
// 	res.header("Access-Control-Allow-Origin", "*"); 
//     res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET, OPTIONS');
// 	res.header("Access-Control-Allow-Headers", "x-www-form-urlencoded, Origin, X-Requested-With, Content-Type, Accept, Authorization");
// 	if (req.method === 'OPTIONS') { 
// 		res.header('Access-Control-Allow-Methods', 'PUT, POST, OPTIONS, PATCH, DELETE, GET');
// 		return res.status(200).json({});
// 	}
// 	next();
// });

// app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
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

 