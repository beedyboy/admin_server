
exports.up = function(knex) {
     return knex
    .schema

    .createTable( 'company', function( companyTable ) { 
        companyTable.engine('InnoDB'); 
        companyTable.increments();
        companyTable.string( 'companyname', 30 ).notNullable();    
        companyTable.string('email',  50).nullable();
        companyTable.string('phone',  50).nullable();
        companyTable.string('address',  50).nullable();
   		companyTable.string( 'image', 100 ).nullable();    
        companyTable.string('updated_at',  50).nullable(); 
    })

    .createTable( 'pages', function( pagesTable ) { 
        pagesTable.engine('InnoDB'); 
        pagesTable.increments();
        pagesTable.string( 'title', 30 ).notNullable();    
        pagesTable.string('slug',  50).nullable();
        pagesTable.text('description').nullable();    
        pagesTable.string('created_at',  50).nullable(); 
        pagesTable.string('updated_at',  50).nullable(); 
    })



};

exports.down = function(knex) {
  
};
