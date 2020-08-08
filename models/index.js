const express = require('express'); 
const routes = express.Router();
const company = require('./company');
const staff = require('./staff');
const role = require('./role');
const category = require('./category');
const seller = require('./seller');
const buyer = require('./buyer');
const shop = require('./shop');
const product = require('./product');
var cors = require('cors');

var whitelist = ['https://admin-commerce.herokuapp.com', 'http://example2.com']
var corsOptions = {
  origin: function (origin) {
    if (whitelist.indexOf(origin) !== -1) {
      console.log("Allowed");
    } else {
      console.log('Not allowed by CORS');
    }
  }
}

routes.use(cors(corsOptions));

routes.options("*", cors(corsOptions));


routes.use("/company", company);
routes.use("/staff", staff);
routes.use("/role", role);
routes.use("/category", category);
routes.use("/seller", seller);
routes.use("/buyer", buyer);
routes.use("/shop", shop);
routes.use("/product", product);

module.exports = routes;

// const account = require('./company');
// const cors = require("cors"); 


// const API_URL = "http://commerce.devprima.com";
// const corsOptions = {
//     allowedHeaders: ["Origin"," X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
//     credentials: true,
//     methods: "GET,HEAD,OPTIONS,PUT,PATH,POST,DELETE",
//     origin: API_URL,
//     preflightContinue: false
// };

