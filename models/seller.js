const express = require('express');
const db = require('../config/knex'); 
const helper = require('../lib/helper');  
const router = express.Router(); 
const {validate, checkHeader} = require('../middleware/valid'); 
 
//get sellers details by id
router.get("/:id", (req, res) => {
    const id = req.params.id;
    const result = db('sellers').where({id}).select().then( ( data ) => { 
     if(data) {
         res.send({
             status: 200,
             data
         })
     }
       else {
        res.send({
          status: 400,
          message: "Wrong information provided"
       });
      
       }
      
       });
});
 

//get all sellers
router.get("/", (req, res) => {  
try {
  db('sellers as s')
  .join('shops as shop', 's.shop_id', '=', 'shop.id')
  .select('s.*', 'shop.shop_name').then( ( data ) => {   
    if(data) {
      res.send({
        status: 200,
        data
        })
      }              
      }).catch(err => {
        console.error('my product', err);
      })
} catch (error) {
  console.log(err);
  res.status(500).json({
    status: 400,
    err
  })
}
}); 


//register seller
router.post("/create/seller", validate('logins'),  (req, res) => {   
	try {
		const { email} = req.body; 
	const password = helper.hash(req.body.password);
	const created_at = new Date().toLocaleString();  
	const preferred = "SELLER";
	 db('shops').returning('id')
	.insert({created_at}).then((shop) => {
	  if(shop.length > 0) {
        helper.createSellerSettings(shop[0], created_at).then((rep) => {
            if(rep === true) {
                 db('sellers').returning('id')
          .insert({ shop_id:shop[0], email, created_at }).then( ( result ) => {  
          if(result.length > 0) {  
        db('logins').insert({seller_id: result[0], preferred,  email,  password}).then( reply => {  
        if(reply)  {
           res.send({  status: 200,  message: 'Account created successfully' });
        } else {
           res.send({  status: 404,  message: 'Account not created' });
        }
    });
       
      }  else {
            res.send({
                status: 404,
                message: 'Account was not created'
            })
        }
    }); 
            }
        })
		 
	  } else {
		res.send({
		  status: 404,
          message: 'Account was not created'
		})
	  }
	})
	} catch (error) {
		console.log(error);
		res.status(500).json({message: "Something went wrong"})
	}

});

 
  
router.post("/toggle", (req, res) => {   
      const {status, id} = req.body;  
      const updated_at = new Date().toLocaleString(); 
     db('sellers').where('id', id).update('status', status)
     .update('updated_at', updated_at)
    .then( ( data ) => {  
      if(data > 0) {
          helper.actDCTLogin('seller_id', id, status)
        res.send({
        status: 200, 
        message: "Seller account updated" 
       });
      }
        else {
          res.send({
          status: 400,
          message: "Error updating status" 
        });
        }
      
      
       }).catch(error =>  {
        console.log('error', error);
        res.send({
          status: 400,
          message: error
        })
      });
               
    });
  
router.delete("/:id", (req, res) => { 
   try {
    db('sellers').where('id', req.params.id).del().then( (result) => {
        res.send({
            status: 200,
            message: 'Buyer deleted successgully'
        })
    } )
   } catch(error) {
    console.log(error);
       res.send({
        status: 400,
        message: error
       })
       
   }
});
 
module.exports = router;