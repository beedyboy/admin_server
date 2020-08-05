
exports.up = function(knex) {
   return knex
    .schema

    
.createTable( 'chats', function( chatTable ) {  
		chatTable.increments();   
		chatTable.integer('buyer').unsigned().nullable(); 
		chatTable.integer('shop_id').unsigned().nullable(); 
		chatTable.text( 'message' ).nullable(); 
		chatTable.enu('sender', ['Buyer', 'Seller', 'Others']).defaultTo('Others'); 
		chatTable.enu('status', ['Read', 'Unread']).defaultTo('Unread');     
		chatTable.string('created_at',  50).nullable();
		chatTable.string('updated_at',  50).nullable();
		chatTable.foreign('buyer').references('id').inTable('buyers')
		.onDelete('CASCADE') .onUpdate('CASCADE');
		chatTable.foreign('shop_id').references('id').inTable('shops')
		.onDelete('CASCADE') .onUpdate('CASCADE');
})

.createTable( 'settings', function( setTable ) {  
		setTable.increments();    
		setTable.integer( 'buyer_id' ).unsigned().nullable(); 
		setTable.integer( 'shop_id' ).unsigned().nullable();   
		setTable.string( 'email', 10 ).nullable().defaultTo(true);  
		setTable.string( 'sms', 10 ).nullable().defaultTo(false);  
		setTable.string('created_at',  50).notNullable();
		setTable.string('updated_at',  50).nullable();   
		setTable.foreign('shop_id').references('id').inTable('shops')
		.onDelete('CASCADE') .onUpdate('CASCADE');
		setTable.foreign('buyer_id').references('id').inTable('buyers')
		.onDelete('CASCADE') .onUpdate('CASCADE');
	})

};

exports.down = function(knex) {
  
};
