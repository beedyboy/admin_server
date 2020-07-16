const express = require('express');
const knex = require('../config/knex').knex; 
const helper = require('../lib/helper');  
const router = express.Router(); 
const {validate, checkHeader} = require('../middleware/valid'); 
 
//get buyers details by id
router.get("/:id", (req, res) => {
    const id = req.params.id;
    const result = knex('buyers').where({id}).select().then( ( data ) => { 
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
const result = knex('buyers').select().then( ( data ) => {   
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

 
router.delete("/:id", (req, res) => { 
   try {
    knex('buyers').where('id', req.params.id).del().then( (result) => {
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