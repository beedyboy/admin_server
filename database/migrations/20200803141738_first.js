
exports.up = function(knex) {
   return knex
    .schema

 .createTable( 'company', function( companyTable ) { 
    // companyTable.engine('InnoDB'); 
    companyTable.increments();
    companyTable.string( 'companyname', 30 ).notNullable();    
    companyTable.string('email',  50).nullable();
    companyTable.string('phone',  50).nullable();
    companyTable.string('address',  50).nullable();
	companyTable.string( 'image', 100 ).nullable();    
    companyTable.string('updated_at',  50).nullable(); 
})

.createTable( 'pages', function( pagesTable ) { 
    // pagesTable.engine('InnoDB'); 
    pagesTable.increments();
    pagesTable.string( 'title', 30 ).notNullable();    
    pagesTable.string('slug',  50).nullable();
    pagesTable.text('description').nullable();    
    pagesTable.string('created_at',  50).nullable(); 
    pagesTable.string('updated_at',  50).nullable(); 
})


.createTable( 'roles', function( rolesTable ) { 
    // rolesTable.engine('InnoDB'); 
    rolesTable.increments();
    rolesTable.string( 'name', 30 ).notNullable();  
    rolesTable.text( 'priviledges' ).notNullable();  
    rolesTable.string('created_at',  50).notNullable();
    rolesTable.string('updated_at',  50).nullable();
    rolesTable.enu('status', ['Active', 'Pending', 'Deleted', 'Banned']).defaultTo('Active');
})

  .createTable( 'staffs', function( staffsTable ) { 
    // staffsTable.engine('InnoDB'); 
    staffsTable.increments();
    staffsTable.integer('role').unsigned().notNullable(); 
    staffsTable.string( 'fullname', 50 ).notNullable(); 
    staffsTable.string( 'phone', 30 ).nullable();   
    staffsTable.string( 'email', 50 ).nullable().unique(); 
    staffsTable.string( 'username', 20 ).notNullable();    
    staffsTable.string( 'password', 250 ).notNullable();    
    staffsTable.string( 'image', 100 ).nullable();  
    staffsTable.enu('status', ['Active', 'Pending', 'Deleted', 'Banned']).defaultTo('Active');
	staffsTable.string('created_at',  50).notNullable();
	staffsTable.string('updated_at',  50).nullable();
    staffsTable.foreign('role').references('id').inTable('roles')
    .onDelete('CASCADE') .onUpdate('CASCADE');
}) 
 
 
.createTable( 'signatures', function( signatureTable ) { 
    // signatureTable.engine('InnoDB');
    signatureTable.increments(); 
    signatureTable.integer('admin_id').unsigned().nullable();  
    signatureTable.string( 'token', 250 ).nullable();  
    signatureTable.string( 'useragent', 250 ).nullable();  
    signatureTable.foreign('admin_id').references('id').inTable('staffs')
    .onDelete('CASCADE') .onUpdate('CASCADE');  
})
 

.createTable( 'categories', function( catTable ) { 
    // catTable.engine('InnoDB');
    catTable.increments();   
    catTable.string( 'name', 30 ).notNullable();      
    catTable.string( 'description', 100 ).nullable();    
	catTable.string('created_at',  50).nullable();
	catTable.string('updated_at',  50).nullable();
    catTable.enu('status', ['Active', 'Inactive', 'Deleted']).defaultTo('Active');
})

.createTable( 'tokens', function( tokenTable ) { 
    // tokenTable.engine('InnoDB');
    tokenTable.increments();  
    tokenTable.string( 'referrer', 20 ).notNullable();  
    tokenTable.string( 'token', 250 ).nullable();  
    tokenTable.string( 'email', 50 ).nullable();  
    tokenTable.enu('used', ['No', 'Yes', 'Expired']).defaultTo('No');
    tokenTable.string( 'expiration', 30 ).nullable();   
	tokenTable.string('created_at',  50).nullable();
	tokenTable.string('updated_at',  50).nullable();
})

};

exports.down = function(knex) {
  
};
