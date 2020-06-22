 
exports.knex = require( 'knex' )( {

  client: 'mysql',
  connection: { 
    host: 'us-cdbr-east-05.cleardb.net',
    user: 'b630dcb44f737e',
    password: '76bc6049',
    database: 'heroku_0af4a054f44f63f',
    charset: 'utf8',

  }

} ); 

// exports.knex = require( 'knex' )( {

//   client: 'mysql',
//   connection: { 
//     host: '127.0.0.1',
//     user: 'root',
//     password: '',
//     database: 'bcommerce',
//     charset: 'utf8',

//   }

// } );
// exports.knex = require( 'knex' )( {

//   client: 'mysql',
//   connection: { 
//     host: '127.0.0.1',
//     user: 'devprima_noroot',
//     password: '&CI@bQ^d0hTm',
//     database: 'devprima_bcommerce',
//     charset: 'utf8',

//   }

// } );

 // mysql://b630dcb44f737e:76bc6049@us-cdbr-east-05.cleardb.net/heroku_0af4a054f44f63f?reconnect=true