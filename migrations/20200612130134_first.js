
exports.up = function(knex) { 
    return knex
    .schema

    .createTable( 'countries', function( countryTable ) { 
        countryTable.engine('InnoDB'); 
        countryTable.increments();
        countryTable.string( 'name', 30 ).notNullable();  
        countryTable.specificType( 'code', 'char(2)' ).nullable();  
        countryTable.specificType( 'code2', 'char(3)' ).nullable();  
        countryTable.string('phonecode',  50).nullable();
        countryTable.string('capital',  50).nullable();
        countryTable.string('currency',  50).nullable();
        countryTable.string('created_at',  50).notNullable();
        countryTable.string('updated_at',  50).nullable(); 
    })

    .createTable( 'states', function( statesTable ) { 
        statesTable.engine('InnoDB'); 
        statesTable.increments();
        statesTable.string( 'name', 30 ).notNullable();  
        statesTable.integer( 'country_id' ).unsigned().notNullable(); 
        statesTable.string( 'state_code', 15 ).notNullable();  
        statesTable.string('created_at',  50).notNullable();
        statesTable.string('updated_at',  50).nullable(); 
        statesTable.foreign('country_id').references('id').inTable('countries')
        .onDelete('CASCADE') .onUpdate('CASCADE');
    })

    .createTable( 'cities', function( cityTable ) { 
        cityTable.engine('InnoDB'); 
        cityTable.increments();
        cityTable.string( 'name', 30 ).notNullable();  
        cityTable.integer( 'state_id').unsigned().notNullable(); 
        cityTable.decimal( 'latitude', 10,8 ).notNullable();  
        cityTable.decimal( 'longitude', 11,8 ).notNullable();  
        cityTable.string('created_at',  50).notNullable();
        cityTable.string('updated_at',  50).nullable();  
        cityTable.foreign('state_id').references('id').inTable('states')
        .onDelete('CASCADE') .onUpdate('CASCADE');
    })
        
.createTable( 'roles', function( rolesTable ) { 
    rolesTable.engine('InnoDB'); 
    rolesTable.increments();
    rolesTable.string( 'name', 30 ).notNullable();  
    rolesTable.text( 'priviledges' ).notNullable();  
    rolesTable.string('created_at',  50).notNullable();
    rolesTable.string('updated_at',  50).nullable();
    rolesTable.enu('status', ['Active', 'Pending', 'Deleted', 'Banned']).defaultTo('Active');
})

  .createTable( 'staffs', function( staffsTable ) { 
    staffsTable.engine('InnoDB'); 
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


  .createTable( 'members', function( membersTable ) { 
    membersTable.engine('InnoDB'); 
    membersTable.increments();
    membersTable.string( 'firstname', 30 ).nullable();
    membersTable.string( 'lastname', 30 ).nullable();
    membersTable.string( 'email', 30 ).notNullable(); 
    membersTable.string( 'password', 250 ).notNullable();    
    membersTable.string( 'phone', 30 ).nullable();   
    membersTable.string( 'nickname', 30 ).nullable(); 
    membersTable.enu('gender', ['Male', 'Female', 'Others']).defaultTo('Others');   
    membersTable.integer( 'location' ).unsigned().nullable(); 
    membersTable.string( 'image', 100 ).nullable();    
    membersTable.integer( 'attempt').nullable();   
    membersTable.string( 'last_login', 30 ).nullable();   
	membersTable.string('created_at',  50).nullable();
	membersTable.string('updated_at',  50).nullable();
    membersTable.enu('status', ['Active', 'Pending', 'Deleted', 'Banned']).defaultTo('Pending');
    membersTable.foreign('location').references('id').inTable('cities')
    .onDelete('CASCADE') .onUpdate('CASCADE');
})

 
.createTable( 'signatures', function( signatureTable ) { 
    signatureTable.engine('InnoDB');
    signatureTable.increments(); 
    signatureTable.integer('admin_id').unsigned().nullable(); 
    signatureTable.integer('mid').unsigned().nullable(); 
    signatureTable.string( 'token', 250 ).nullable();  
    signatureTable.string( 'useragent', 250 ).nullable();  
    signatureTable.foreign('admin_id').references('id').inTable('staffs')
    .onDelete('CASCADE') .onUpdate('CASCADE'); 
    signatureTable.foreign('mid').references('id').inTable('members')
    .onDelete('CASCADE') .onUpdate('CASCADE');
})

.createTable( 'shops', function( shopTable ) { 
    shopTable.engine('InnoDB');
    shopTable.increments();  
    shopTable.integer('mid').unsigned().nullable(); 
    shopTable.string( 'name', 30 ).nullable();      
    shopTable.text( 'description' ).nullable();         
    shopTable.integer( 'location' ).unsigned().nullable(); 
    shopTable.enu('status', ['Active', 'Inactive', 'Deleted']).defaultTo('Active');
    shopTable.foreign('mid').references('id').inTable('members')
    .onDelete('CASCADE') .onUpdate('CASCADE');
    shopTable.foreign('location').references('id').inTable('cities')
    .onDelete('CASCADE') .onUpdate('CASCADE');
})



.createTable( 'categories', function( catTable ) { 
    catTable.engine('InnoDB');
    catTable.increments();   
    catTable.string( 'name', 30 ).notNullable();      
    catTable.string( 'description', 100 ).nullable();    
	catTable.string('created_at',  50).nullable();
	catTable.string('updated_at',  50).nullable();
    catTable.enu('status', ['Active', 'Inactive', 'Deleted']).defaultTo('Active');
})


.createTable( 'tokens', function( tokenTable ) { 
    tokenTable.engine('InnoDB');
    tokenTable.increments();  
    tokenTable.string( 'token', 250 ).nullable();  
    tokenTable.string( 'email', 50 ).nullable();  
    tokenTable.enu('used', ['No', 'Yes', 'Expired']).defaultTo('No');
    tokenTable.string( 'expiration', 30 ).nullable();   
	tokenTable.string('created_at',  50).nullable();
	tokenTable.string('updated_at',  50).nullable();
})

  //product will have location
};

exports.down = function(knex) {
  
};
