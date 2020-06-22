 
exports.knex = require( 'knex' )( {

  client: 'mysql',
  connection: { 
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'bcommerce',
    charset: 'utf8',

  }

} );
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

 