
 const knex = require('knex');
 const env = process.env.DB_ENV || 'development'
 const config = require('../knexfile.js');
 const db = knex(config[env]);

 module.exports = db;

// exports.knex = require( 'knex' )( {

//   client: 'mysql',
//   connection: { 
//     host: '209.205.209.130',
//     user: 'devprima_noroot',
//     password: '&CI@bQ^d0hTm',
//     database: 'devprima_bcommerce',
//     charset: 'utf8',

//   }

// } );
 