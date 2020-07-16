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
             });
});
 
//get staff details by id
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

//get profile
router.get("/get/profile", (req, res) => {  
       // var reply = helper.getProfile(req, 'products', 'admin_id');
       // console.log('reply', reply);
  try {    
    const verify = helper.isThereToken(req);
    if(verify && verify.exist === true) {
      const token = verify.token; 
      knex('signatures').where({token}).select('admin_id').then((data) => { 
        if (data.length > 0) {
          knex('products').where('id', data[0].admin_id).then((payload) => {
            const role = payload[0].role;
            const result = knex('shops').where('id', role).select('name').then( ( roleData ) => {
              payload[0].roleName = roleData[0].name;
              console.log(payload[0]);
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
router.post("/", validate('products'),  (req, res) => {   
    const {fullname,  role, username, email} = req.body; 
    const password = helper.hash(req.body.password);
    const created_at = new Date().toLocaleString();
    let response = null; 
    knex('products')
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
    let response = null; 
    knex('products').where('id', id).update({ fullname, username, role, updated_at }).then( ( result ) => { 
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

router.post("/auth",  (req, res) => { 

 // console.log( helper.hash('testing'));
     const username = req.body.user;
    const password = helper.hash(req.body.password);  
      knex('products').where('username', username).select()
     .then((user) => {  
      if(user.length < 1) {
        res.send({
          status: 400,
          msg: "wrong username or password"
        });
      } else { 
        const data = user[0];
        if( bcrypt.compareSync(req.body.password, data.password)) {  
          const token = helper.generateToken(data); 
        // console.log(token);
         knex('signatures').where('admin_id', data.id).update( 'token', token).then( sign => {
         if(sign) {
          res.send({
            status: 200,
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
        }//user found
       });
   
});

module.exports = router;