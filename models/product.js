const express = require('express');
const knex = require('../config/knex').knex; 
const helper = require('../lib/helper');
const {validate, checkHeader} = require('../middleware/valid'); 
const bcrypt = require("bcryptjs");
// const mailer = require("../plugins/mailer");
// const router = require('express').Router;

const router = express.Router();


 
//get all product 
router.get("/", (req, res) => {  
  knex('products') 
   .join('sellers as s', 'products.shop_id', '=', 's.id')
   .join('categories as c', 'products.cat_id', '=', 'c.id')
.select('products.*', 'c.name as catName',
    's.shop_name as shopName').then( ( data ) => {  
          res.send( data ).status(200); 
          }).catch(err => {
            console.log('all ', err);
          })
});
 
//get product details by id
router.get("/:id", checkHeader, (req, res) => {  
    const id = req.params.id ; 
        const result = knex('products').where({id}).select().then( ( data ) => {              
            if(data) {
                res.send({
                    status: 200,
                    data
                })
            }
              res.send({
                 status: 400
              });
            
             });
}); 

 
router.post("/toggle", (req, res) => {   
  const {status, id} = req.body;   
  const updated_at = new Date().toLocaleString();  
  knex('products').where('id', id).update({ status, updated_at }).then( ( result ) => { 
 if(result) { 
          res.send( {
              status: 200,
              message: 'Product updated successfully'
              } );
      } else {
          res.send({
              status: 204,
              message: 'Product was not updated'
          })
      }
  }); 
});


module.exports = router;