const express = require('express'); 
const routes = express.Router();
const staff = require('./staff');
const role = require('./role');
const category = require('./category');
const member = require('./member');
const shop = require('./shop');
// const account = require('./company');
const cors = require("cors"); 


// const API_URL = "http://192.168.43.225";
const API_URL = "http://localhost:3000";
const corsOptions = {
    allowedHeaders: ["Origin"," X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATH,POST,DELETE",
    origin: API_URL,
    preflightContinue: false
};

// var whitelist = ['http://192.168.43.13', 'http://example2.com']
// var corsOptions = {
//   origin: function (origin) {
//     if (whitelist.indexOf(origin) !== -1) {
//       console.log("Allowed");
//     } else {
//       console.log('Not allowed by CORS');
//     }
//   }
// }

routes.use(cors(corsOptions));

routes.options("*", cors(corsOptions));

routes.use("/staff", staff);
routes.use("/role", role);
routes.use("/category", category);
routes.use("/member", member);
routes.use("/shop", shop);

module.exports = routes;