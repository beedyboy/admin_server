const express = require('express');
const db = require('../config/knex'); 
const helper = require('../lib/helper');  
const router = express.Router(); 
const {validate, checkHeader} = require('../middleware/valid'); 
 
//get buyers details by id
router.get("/:id", (req, res) => {
    const id = req.params.id;
    const result = db('buyers').where({id}).select().then( ( data ) => { 
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
 

//get all buyers
router.get("/", (req, res) => {  
const result = db('buyers').select().then( ( data ) => {   
 if(data) {
              res.send({
                  status: 200,
                  data
              })
          } 
          
           }).catch(err => {
            console.error('my product', err);
          })
}); 
  
//register buyer 
router.post("/create/buyer", validate('logins'),  (req, res) => {   
	try {
		const { email} = req.body; 
	const password = helper.hash(req.body.password);
	const created_at = new Date().toLocaleString(); 
	const preferred = "BUYER";
	db('buyers')
	.returning('id')
	.insert({   email, created_at }).then( ( result ) => { 
	if(result.length > 0) {   
        const buyer_id = result[0];
         helper.createBuyerSettings(buyer_id, created_at).then((rep) => {
            if(rep === true) {
                db('logins').insert({ buyer_id, preferred, email, password }).then( reply => {   
        if(reply)  {
           res.send({  status: 200,  message: 'Account created successfully' });
        } else {
           res.send({  status: 404,  message: 'Account not created' });
        }
    });
            }
         }) 
	   
	  }  else {
			res.send({
				status: 404,
				message: 'Account was not created'
			})
		}
	}).catch(err => {
	  console.log(err);
	}) 
	} catch (error) {
		console.log(error);
		res.status(500).json({message: "Something went wrong"})
	}
});

 
router.delete("/:id", (req, res) => { 
   try {
    db('buyers').where('id', req.params.id).del().then( (result) => {
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