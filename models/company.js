const express = require('express');
const knex = require('../config/knex').knex; 
const helper = require('../lib/helper');
const {valid, verify} = require('../middleware/valid');
const bcrypt = require('bcryptjs');
const mailer = require("../plugins/mailer"); 
const sms  = require('../plugins/sms');
// const router = require('express').Router;

const router = express.Router();

// const router = Router();

router.get("/:email", (req, res) => { 
    const name = req.params.email;
        const result = knex('companies').where('email', name).select().then( ( data ) => { 
           if(data) {
               res.send({
                   exist: true
               })
           }
             res.send({
                 exist: false
             });
            
            
             });
});

router.get("/", (req, res) => {  
        const result = knex('companies').select().then( ( data ) => {  
             res.send( data ).status(200);
            
            
             });
});

router.post("/mail", (req, res) => {
    const subject = "Testing email server";
    const body = "This is to say, mailer is working";
    mailer.sendMail(subject,req.body.email,body);
    res.send("sent");
});

router.post("/", valid,  (req, res) => {
//    console.log("REQUEST", req.body);
    const {sid, companyname, address, email,  phone} = req.body; 
    const password = helper.hash(req.body.password);
    const created_at = new Date().toLocaleString(); 
    knex('companies').insert({  sid, companyname, address, email, password, phone, created_at }).then( ( result ) => { 
        
        if(result) {
            const code = helper.generateToken();
            const subject = "Account Confirmation";
            const body = `Thank you for registering with us. <p> 
            To activate your account, kindly use the following code <b> ${code}</b></p>`;
            const status = 'Account';
            const message = `Your one time verification code is ${code}`;
            sms.sendMessage(phone, message);
            knex('activations').insert({ email, phone, code, status }).then( (result) => {
                mailer.sendMail(subject,email,body);
            });
           

            res.send( {
                status: 200,
                message: 'Account created successfully, Kindly click the link sent to your email to activate your account'
                } );
        } else {
            res.send({
                status: 204,
                message: 'Account not created'
            })
        }
    }); 
});


router.post("/verify", verify, (req, res) => { 
    const {email} = req.body; 
    knex('companies').where('email', email).update( 'status', 'Active').then( user => {
        if (!user) {
            res.json({
               status: 204, 
               msg: "Error activating account"
            });
           }  
           res.json({
               status: 200, 
               msg: "Account activated successfully"
            });
    })
  
   
});
router.post("/auth", (req, res) => {
    // const {email, password} = req.body;
    // password = helper.hash(password);  
    // let user =  knex('companies').where({email }).select();
    // if (!user) {
    //      res.json({
    //         status: 204,
    //         isAuth: false,
    //         msg: "Wrong email or password",
    //         user
    //      });
    //     } else {
    //         if (bcrypt.compareSync(password, user.password)) {
    //             res.json({
    //                 status: 200, 
    //                 user
    //             });
    //         } else {
    //             res.json({
    //                 status: 204,
    //                 isAuth: false,
    //                 msg: "Wrong email or password",
    //                 user
    //              });
    //         }
               
    //     }
   
});
module.exports = router;