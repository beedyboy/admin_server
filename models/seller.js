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
const result = db('sellers').select().then( ( data ) => {   
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

  
router.post("/toggle", (req, res) => {   
      const {status, id} = req.body;  
      const updated_at = new Date().toLocaleString(); 
     db('sellers').where('id', id).update('status', status)
     .update('updated_at', updated_at)
    .then( ( data ) => {  
      if(data > 0) {
          helper.actDCTLogin('shop_id', id, status)
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