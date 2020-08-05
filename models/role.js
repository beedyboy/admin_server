const express = require('express'); 
const helper = require('../lib/helper');
const db = require('../config/knex'); 
// const {valid} = require('../middleware/valid'); 
// const mailer = require("../plugins/mailer");
// const router = require('express').Router;

const router = express.Router();

// const router = Router();
//get role details by id
router.get("/:id", (req, res) => {
    const name = req.params.id;
    const result = db('roles').where('id', name).select().then( ( data ) => { 
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

//check whether role exist
router.get("/:name/exist", (req, res) => {   
    const name = req.params.name ;
       const result = db('roles').where({name}).select().then( ( data ) => { 
            if(data.length > 0) {
                res.send({
                    exist: true
                })
            }
              else {
                res.send({
                status: 400,
                  exist: false
              });
              }
            
            
             });
             
});

//get all roles
router.get("/", (req, res) => {  
   db('roles').select().then( ( data ) => {  
             res.send( data ).status(200); 
             });
});


//create a new role
router.post("/",  (req, res) => {   
    const {name} = req.body; 
    const created_at = new Date().toLocaleString();
    // let response = null;
    const priviledges = JSON.stringify(req.body.priviledges);
    // console.log('body', priviledges);
    db('roles').insert({  name, priviledges, created_at }).then( ( result ) => { 
        
        if(result) { 
            res.send( {
                status: 200,
                message: 'Role created successfully'
                } );
        } else {
            res.send({
                status: 204,
                message: 'Role was not created'
            })
        }
    }); 
});
router.post("/update",  (req, res) => {   
    const {name, id} = req.body; 
    const updated_at = new Date().toLocaleString(); 
    const priviledges = JSON.stringify(req.body.priviledges); 
    db('roles').where('id', id).update({  name, priviledges, updated_at }).then( ( result ) => {         
        if(result) { 
            res.send( {
                status: 200,
                message: 'Role updated successfully'
                } );
        } else {
            res.send({
                status: 204,
                message: 'Role was not updated'
            })
        }
    }); 
});

router.delete("/:id", (req, res) => {
//    console.log('req', req.params) 
   try {
    db('roles').where('id', req.params.id).del().then( (result) => {
        res.send({
            status: 200,
            message: 'Role deleted successgully'
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

