
exports.up = function(knex) {
   return knex
    .schema
    .createTable( 'buyers', function( buyersTable ) {  
		buyersTable.increments();
		buyersTable.string( 'firstname', 30 ).nullable();
		buyersTable.string( 'lastname', 30 ).nullable();
		buyersTable.string( 'email', 30 ).notNullable();   
		buyersTable.string( 'phone_number', 30 ).nullable();   
		buyersTable.string( 'nickname', 30 ).nullable(); 
		buyersTable.enu('gender', ['Male', 'Female', 'Others']).defaultTo('Others');   
		buyersTable.string( 'image', 100 ).nullable();    
		buyersTable.integer( 'attempt').nullable();   
		buyersTable.string( 'last_login', 30 ).nullable();   
		buyersTable.string('created_at',  50).notNullable();
		buyersTable.string('updated_at',  50).nullable();
		buyersTable.enu('status', ['Active', 'Pending', 'Deleted', 'Banned']).defaultTo('Pending'); 
	})

	 .createTable( 'shops', function( shopTable ) {  
        shopTable.increments();   
    	shopTable.string( 'shop_name', 30 ).nullable();      
    	shopTable.text( 'description' ).nullable();  
        shopTable.string('phone_number',  50).nullable(); 
        shopTable.string('currency',  20).nullable();
        shopTable.string('created_at',  50).notNullable();
        shopTable.string('updated_at',  50).nullable(); 
    	shopTable.enu('status', ['Active', 'Pending', 'Deleted']).defaultTo('Pending');  
    }) 

.createTable( 'sellers', function( sellersTable ) { 
        // sellersTable.engine('InnoDB'); 
        sellersTable.increments();
		sellersTable.string( 'firstname', 30 ).nullable();
		sellersTable.string( 'lastname', 30 ).nullable();
		sellersTable.string( 'email', 30 ).notNullable();   
    	sellersTable.integer( 'shop_id', 30 ).unsigned().nullable();    
        sellersTable.string('phone_number',  50).nullable();
		sellersTable.enu('gender', ['Male', 'Female', 'Others']).defaultTo('Others');   
		sellersTable.string( 'image', 100 ).nullable();    
		sellersTable.integer( 'attempt').nullable();   
		sellersTable.string( 'last_login', 30 ).nullable();     
        sellersTable.string('created_at',  50).notNullable();
        sellersTable.string('updated_at',  50).nullable(); 
    	sellersTable.enu('account_type', ['Primary', 'Secondary']).defaultTo('Primary');  
    	sellersTable.enu('status', ['Active', 'Pending', 'Deleted']).defaultTo('Pending');  
		sellersTable.foreign('shop_id').references('id').inTable('shops')
			.onDelete('CASCADE') .onUpdate('CASCADE'); 
    }) 

  .createTable( 'logins', function( loginTable ) {  
	    loginTable.increments();
		loginTable.string( 'email', 30 ).notNullable(); 
		loginTable.string( 'password', 250 ).notNullable(); 
	    loginTable.integer('buyer_id').unsigned().nullable(); 
	    loginTable.integer('seller_id').unsigned().nullable();  
	    loginTable.string('buyer_token', 100).nullable(); 
	    loginTable.string('seller_token',  100).nullable(); 
	    loginTable.string('updated_at',  50).nullable(); 
		loginTable.enu('preferred', ['BUYER', 'SELLER', 'OTHERS']).defaultTo('OTHERS');
		loginTable.enu('status', ['Active', 'Pending', 'Deleted']).defaultTo('Pending');
		loginTable.foreign('buyer_id').references('id').inTable('buyers')
			.onDelete('CASCADE') .onUpdate('CASCADE');
		loginTable.foreign('seller_id').references('id').inTable('sellers')
			.onDelete('CASCADE') .onUpdate('CASCADE'); 
}) 

    
.createTable( 'products', function( productTable ) {  
		productTable.increments();  
		productTable.integer('cat_id').unsigned().nullable(); 
		productTable.integer('shop_id').unsigned().nullable(); 
		productTable.string( 'product_name', 30 ).nullable();   
		productTable.text( 'description' ).nullable();         
		productTable.text( 'tags' ).nullable();         
		productTable.string( 'latitude', 20 ).nullable();  
		productTable.string( 'longitude', 20 ).nullable();  
		productTable.string( 'main_image', 70 ).nullable(); 
		productTable.string( 'first_image', 70 ).nullable(); 
		productTable.string( 'middle_image', 70 ).nullable(); 
		productTable.string( 'last_image', 70 ).nullable();  
		productTable.enu('status', ['Active', 'Pending', 'Deleted']).defaultTo('Pending');    
		productTable.string('created_at',  50).nullable();
		productTable.string('updated_at',  50).nullable();
		productTable.foreign('cat_id').references('id').inTable('categories')
		.onDelete('CASCADE') .onUpdate('CASCADE');
		productTable.foreign('shop_id').references('id').inTable('shops')
		.onDelete('CASCADE') .onUpdate('CASCADE'); 
})
.createTable( 'stocks', function( stockTable ) {  
		stockTable.increments();   
		stockTable.integer('product_id').unsigned().nullable();  
		stockTable.string( 'available', 30 ).nullable();      
		stockTable.string( 'price', 30 ).nullable();       
		stockTable.string( 'latitude', 20 ).nullable();  
		stockTable.string( 'longitude', 20 ).nullable();   
		stockTable.string( 'first_delivery', 50 ).nullable();    
		stockTable.string( 'second_delivery', 50 ).nullable();    
		stockTable.string( 'third_delivery', 50 ).nullable(); 
		stockTable.string( 'within_distance', 30 ).nullable();   
		stockTable.string( 'within_charge', 30 ).nullable();     
		stockTable.string( 'beyond_distance', 30 ).nullable();    
		stockTable.string( 'beyond_charge', 30 ).nullable(); 
		stockTable.enu('featured', ['Yes', 'No']).defaultTo('No'); 
		stockTable.enu('packed', ['PACKED', 'UNPACKED']).defaultTo('PACKED');
		stockTable.enu('status', ['Active', 'Pending', 'Deleted']).defaultTo('Pending');    
		stockTable.string('created_at',  50).nullable();
		stockTable.string('updated_at',  50).nullable(); 
		stockTable.foreign('product_id').references('id').inTable('products')
		.onDelete('CASCADE') .onUpdate('CASCADE'); 
})

.createTable( 'bids', function( bidTable ) {  
		bidTable.increments();  
		bidTable.integer('stock_id').unsigned().nullable(); 
		bidTable.integer('buyer_id').unsigned().nullable(); 
		bidTable.integer('shop_id').unsigned().nullable(); 
		bidTable.string( 'bid_token', 30 ).nullable();     
		bidTable.string('created_at',  50).nullable();
		bidTable.string('updated_at',  50).nullable();
		bidTable.enu('status', ['Ongoing', 'Completed', 'Canceled', 'Deleted']).defaultTo('Ongoing');    
		bidTable.foreign('stock_id').references('id').inTable('stocks')
		.onDelete('CASCADE') .onUpdate('CASCADE');
		bidTable.foreign('shop_id').references('id').inTable('shops')
		.onDelete('CASCADE') .onUpdate('CASCADE');
		bidTable.foreign('buyer_id').references('id').inTable('buyers')
		.onDelete('CASCADE') .onUpdate('CASCADE');
})

.createTable( 'auctions', function( auctionTable ) {  
		auctionTable.increments();
		auctionTable.string( 'bid_token', 50 ).nullable();   
		auctionTable.integer('bid_id').unsigned().notNullable();  
		auctionTable.integer( 'buyer_id' ).unsigned().nullable(); 
		auctionTable.integer( 'shop_id' ).unsigned().nullable();   
		auctionTable.string( 'quantity', 30 ).nullable().defaultTo(1); 
		auctionTable.string( 'price', 30 ).nullable(); 
		auctionTable.string( 'first_delivery', 50 ).nullable();    
		auctionTable.string( 'second_delivery', 50 ).nullable();    
		auctionTable.string( 'third_delivery', 50 ).nullable(); 
		auctionTable.string( 'within_distance', 30 ).nullable();   
		auctionTable.string( 'within_charge', 30 ).nullable();     
		auctionTable.string( 'beyond_distance', 30 ).nullable();    
		auctionTable.string( 'beyond_charge', 30 ).nullable();   
		auctionTable.string('created_at',  50).notNullable();
		auctionTable.string('updated_at',  50).nullable();
		auctionTable.enu('packed', ['PACKED', 'UNPACKED']).defaultTo('PACKED');
		auctionTable.enu('status', ['Ongoing', 'Successful', 'Canceled']).defaultTo('Ongoing');    
		auctionTable.enu('buyer', ['Accepted',  'Counter', 'Others', 'Buyer Canceled']).defaultTo('Others');    
		auctionTable.enu('seller', ['Accepted', 'Counter', 'Others', 'Seller Canceled']).defaultTo('Others');    
		auctionTable.foreign('bid_id').references('id').inTable('bids')
		.onDelete('CASCADE') .onUpdate('CASCADE');    
		auctionTable.foreign('shop_id').references('id').inTable('shops')
		.onDelete('CASCADE') .onUpdate('CASCADE');
		auctionTable.foreign('buyer_id').references('id').inTable('buyers')
		.onDelete('CASCADE') .onUpdate('CASCADE');
	})

	.createTable( 'transactions', function( transTable ) {  
		transTable.increments();
		transTable.integer('auction_id').unsigned().notNullable();   
		transTable.integer( 'buyer_id' ).unsigned().nullable(); 
		transTable.integer( 'shop_id' ).unsigned().nullable(); 
		transTable.string( 'total', 10 ).nullable().defaultTo(0);    
		transTable.string('created_at',  50).notNullable();
		transTable.string('updated_at',  50).nullable();
		transTable.enu('status', ['Paid', 'Failed', 'Others']).defaultTo('Others');    
		transTable.foreign('auction_id').references('id').inTable('auctions')
		.onDelete('CASCADE') .onUpdate('CASCADE');
		transTable.foreign('shop_id').references('id').inTable('shops')
		.onDelete('CASCADE') .onUpdate('CASCADE');
		transTable.foreign('buyer_id').references('id').inTable('buyers')
		.onDelete('CASCADE') .onUpdate('CASCADE');
	})

	.createTable( 'notifications', function( noticeTable ) {  
			noticeTable.increments(); 
			noticeTable.integer( 'buyer_id' ).unsigned().nullable(); 
			noticeTable.integer( 'shop_id' ).unsigned().nullable();  
			noticeTable.integer( 'notice_id' ).unsigned().nullable();  
			noticeTable.string( 'message', 200 ).nullable();
			noticeTable.string('created_at',  50).notNullable();
			noticeTable.string('updated_at',  50).nullable(); 
			noticeTable.enu('notification_type', ['Bids', 'Auctions', 'Payment', 'Account', 'Others']).defaultTo('Others');    
			noticeTable.foreign('shop_id').references('id').inTable('shops')
			.onDelete('CASCADE') .onUpdate('CASCADE');
			noticeTable.foreign('buyer_id').references('id').inTable('buyers')
			.onDelete('CASCADE') .onUpdate('CASCADE');
		})

	.createTable( 'readers', function( readTable ) {  
			readTable.increments(); 
			readTable.integer( 'notification_id' ).unsigned().nullable(); 
			readTable.enu('sms', ['Yes', 'No']).defaultTo('No'); 
			readTable.enu('mail', ['Yes', 'No']).defaultTo('No'); 
			readTable.enu('read', ['Yes', 'No']).defaultTo('No'); 
			readTable.string('created_at',  50).notNullable();
			readTable.string('updated_at',  50).nullable();    
			readTable.foreign('notification_id').references('id').inTable('notifications')
			.onDelete('CASCADE') .onUpdate('CASCADE');
		})

.createTable( 'ratings', function( ratingTable ) {  
		ratingTable.increments();
		ratingTable.integer('pid').unsigned().notNullable();  
		ratingTable.integer( 'buyer_id' ).unsigned().nullable(); 
		ratingTable.string( 'rate', 10 ).nullable().defaultTo(0);   
		ratingTable.string( 'comment', 100 ).nullable();   
		ratingTable.string('created_at',  50).notNullable();
		ratingTable.foreign('pid').references('id').inTable('products')
		.onDelete('CASCADE') .onUpdate('CASCADE');
		ratingTable.foreign('buyer_id').references('id').inTable('buyers')
		.onDelete('CASCADE') .onUpdate('CASCADE');
	})
};

exports.down = function(knex) {
     return knex
    .schema
    .dropTable('logins')
};
