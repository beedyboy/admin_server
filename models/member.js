const express = require('express');
const knex = require('../config/knex').knex; 
const helper = require('../lib/helper');  
const router = express.Router(); 
const {validate, checkHeader} = require('../middleware/valid'); 
 
//get members details by id
router.get("/:id", (req, res) => {
    const id = req.params.id;
    const result = knex('members').where({id}).select().then( ( data ) => { 
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

//check whether members exist
router.get("/:name/exist", (req, res) => {   
    const name = req.params.name ;
    const result = helper.nameExist('members', name);
    res.send({exist: result});

             
});

//get all modules
router.get("/", (req, res) => {  
const result = knex('members').select().then( ( data ) => {   

     res.send( data ).status(200); 
     });
});

 
 
//create staff account
router.post("/", validate('members'),  (req, res) => {   
    const {firstname, lastname,  email} = req.body; 
    const password = helper.hash(req.body.password);
    const created_at = new Date().toLocaleString();
    let response = null;
    // knex('staffs').returning('id')
    knex('members')
    .insert({ firstname, lastname,  email, password, created_at }).then( ( result ) => { 
    if(result) { 
    knex('signatures').insert({mid: result}).then( reply => {
        if(reply)  {
          res.send({
                        status: 200,
                        message: 'Account created successfully'
                    })
        } else {
           res.send({
                status: 404,
                message: 'Account was not created'
            })
        }
    })
           
        } else {
            res.send({
                status: 404,
                message: 'Account was not created'
            })
        }
    }); 
});
 

//check whether members exist
router.post("/update", (req, res) => {  
  try {
if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
  console.log('token', req.headers.authorization.split(' ')[1]);
} 
    const {id, name, description} = req.body ;
    const updated_at = new Date().toLocaleString();
  knex('members').where('id', id).update( { name, description,  updated_at })
  .then( ( data ) => {  
    if(data) {
      res.send({
      status: 200, 
      message: "Category updated successfully" 
     });
    }
      else {
        res.send({
        status: 400,
        message: "Error updating category" 
      });
      }
    
    
     });
             
  } catch(error) {
    console.log('error', error);
    res.send({
      status: 400,
      message: error
    })
  }
});

router.delete("/:id", (req, res) => { 
   try {
    knex('members').where('id', req.params.id).del().then( (result) => {
        res.send({
            status: 200,
            message: 'Category deleted successgully'
        })
    } )
   } catch(error) {
    console.log(error);
       res.send({
        status: 400,
        message: error
       })
       
   }
})
module.exports = router;