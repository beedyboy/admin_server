const express = require('express');
const knex = require('../config/knex').knex; 
const helper = require('../lib/helper');
const {validate, checkHeader} = require('../middleware/valid'); 
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const util = require('../config/util').get(process.env.NODE_ENV);
// const mailer = require("../plugins/mailer");
// const router = require('express').Router;

const router = express.Router();

//check if 
router.get("/:email/exist", (req, res) => { 
   try {
     const email = req.params.email;  
     knex('staffs').where({email}).select('email').then( ( data ) => {  
     if(data.length > 0) {
      res.send({exist: true});
    } else {
       res.send({exist: false});
     } 
    
    }); 
  } catch (err) {
    console.log(err);
  }

});

 

router.get("/:user/exist", (req, res) => { 
  const name = req.params.username;
    knex('staffs').where('email', name).select().then( ( data ) => { 
    // console.log(data, data.length); 
     if(data.length > 0) res.send({exist: true}); 
       res.send({exist: false});
    });  
 

});

//get all staff
router.get("/", (req, res) => {  
     knex('staffs').join('roles', 'staffs.role', '=', 'roles.id')
     .select('staffs.id', 'staffs.role', 'staffs.fullname', 'staffs.email', 
      'staffs.phone', 'staffs.username', 'staffs.image', 'staffs.status',  'staffs.created_at',  'staffs.updated_at', 
      'roles.name as roleName').then( ( data ) => {  
             res.send( data ).status(200); 
             });
});


//get staff details by id
router.get("/:id", checkHeader, (req, res) => {  
    const id = req.params.id ; 
        const result = knex('staffs').where({id}).select().then( ( data ) => {              
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

//get profile
router.get("/get/profile", (req, res) => {   
  try {    
    const verify = helper.isThereToken(req);
    if(verify && verify.exist === true) {
      const token = verify.token; 
      knex('signatures').where({token}).select('admin_id').then((data) => { 
        if (data.length > 0) {
          knex('staffs').where('id', data[0].admin_id).then((payload) => {
            const role = payload[0].role;
            const result = knex('roles').where('id', role).select('name').then( ( roleData ) => {
              payload[0].roleName = roleData[0].name;
              // console.log(payload[0]);
            res.send({
                        status: 200,
                        data: payload[0]
                      }) 
            }); 
           
          }) 
        
        } else {
            res.send({
              status: 400,
              msg: 'Invalid token, please sign in and try again!'
            });
             
        }
      })
    } else {
      res.send({
              status: 400,
              msg: 'Invalid token, please sign in and try again!'
            }); 
    }
  
} catch (err) {
  console.log('error', err);
}
  }); 
//create staff account
router.post("/", validate('staffs'),  (req, res) => {   
    const {fullname,  role, username, email} = req.body; 
    const password = helper.hash(req.body.password);
    const created_at = new Date().toLocaleString(); 
    // knex('staffs').returning('id')
    knex('staffs')
    .insert({ fullname, email, username, password, role, created_at }).then( ( result ) => { 
    if(result) { 
    knex('signatures').insert({admin_id: result}).then( reply => {
        if(reply)  {
          res.send({
                        status: 200,
                        message: 'New staff account created successfully'
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

router.post("/update", (req, res) => {   
    const {fullname,  role, username, id} = req.body;   
    const updated_at = new Date().toLocaleString();  
    knex('staffs').where('id', id).update({ fullname, username, role, updated_at }).then( ( result ) => { 
   if(result) { 
            res.send( {
                status: 200,
                message: 'Account updated successfully'
                } );
        } else {
            res.send({
                status: 204,
                message: 'Account was not updated'
            })
        }
    }); 
});

router.post("/toggle", (req, res) => {   
    const {status, id} = req.body;   
    const updated_at = new Date().toLocaleString();  
    knex('staffs').where('id', id).update({ status, updated_at }).then( ( result ) => { 
   if(result) { 
            res.send( {
                status: 200,
                message: 'Account updated successfully'
                } );
        } else {
            res.send({
                status: 204,
                message: 'Account was not updated'
            })
        }
    }); 
});

router.post("/auth", (req, res) => {
   const username = req.body.user;
    const password = helper.hash(req.body.password); 
    knex('staffs').where({username}).select().then( (user ) => {
        if(user.length > 0) {
        const data = user[0];
        if (bcrypt.compareSync(req.body.password, data.password)) {
             const token = helper.generateToken(data);  
              knex('signatures').where('admin_id', data.id).update( 'token', token).then( sign => {
         if(sign) {
          res.send({
            status: 200,
             msg: "Login successful", 
            user: data,
            token
           });
          }
      });
           
        } else {
            res.send({
          status: 400,
          msg: "wrong username or password"
        });
        }
           
        } else {
             res.send({
          status: 400,
          msg: "wrong username or password"
        });
        }
        
    })
   
});


module.exports = router;