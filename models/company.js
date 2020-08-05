const express = require('express');
const db = require('../config/knex'); 
const helper = require('../lib/helper');
const { generateSlug } = require('../lib/function');
const mailer = require("../plugins/mailer"); 
const sms  = require('../plugins/sms');
// const router = require('express').Router;

const router = express.Router();

// const router = Router();

 

router.get("/", (req, res) => {  
        const result = db('company').select().then( ( data ) => {  
             res.send( data ).status(200);
            
            
             });
});

//orders
// users
// transactions
// bids
router.get("/dashboard", (req, res) => {  
    let buyers = 0;
    let sellers = 0;
    db('buyers').count('id as b').then( (buyer) => {
        buyers = buyer[0].b; 
    db('sellers').count('id as s').then( (seller) => {
            sellers = seller[0].s
    db('products').count('id as p').then( (product) => {
        res.send({
        buyers,
        sellers,
        products: product[0].p

        });
    });
        
    });
    });
       
});

router.post("/mail", (req, res) => {
    const subject = "Testing email server";
    const body = "This is to say, mailer is working";
    mailer.sendMail(subject,req.body.email,body);
    res.send("sent");
});

router.get("/getProfile", (req, res) => {  
    const id = 1 ; 
        const result = db('company').where({id}).select().then( ( data ) => {              
            if(data) {
                res.send({
                    status: 200,
                    data
                })
            }
                          
             });
});

router.get("/pages", (req, res) => {   
        const result = db('pages').select().then( ( data ) => {              
            if(data) {
                res.send({
                    status: 200,
                    data
                })
            }
              
             });
}); 


router.post("/",  (req, res) => { 
    const { name: companyname, address, email,  phone} = req.body;   
    db('company').where('id', 1).update({  companyname, address, email, phone }).then( ( result ) => { 
        
        if(result) { 
            res.send( {
                status: 200,
                message: 'Profile updated successfully'
                } );
        } else {
            res.send({
                status: 204,
                message: 'Account not updated'
            })
        }
    }); 
});


router.post("/pages",  (req, res) => { 
    const { description, title} = req.body; 
    const slug =   generateSlug(title);
    const created_at = new Date().toLocaleString();
    db('pages').insert({  description, title, slug, created_at }).then( ( result ) => { 
        
        if(result) { 
            res.send( {
                status: 200,
                message: 'New page created successfully'
                } );
        } else {
            res.send({
                status: 204,
                message: 'Page not created'
            })
        }
    }); 
});

router.post("/pd",  (req, res) => {
//    console.log("REQUEST", req.body);
    const { name: companyname, address, email,  phone} = req.body;  
    const created_at = new Date().toLocaleString(); 
    db('company').insert({  companyname, address, email, phone, created_at }).then( ( result ) => { 
        
        if(result) {
            const code = helper.generateToken();
            const subject = "Account Confirmation";
            const body = `Thank you for registering with us. <p> 
            To activate your account, kindly use the following code <b> ${code}</b></p>`;
            const status = 'Account';
            const message = `Your one time verification code is ${code}`;
            sms.sendMessage(phone, message);
            db('activations').insert({ email, phone, code, status }).then( (result) => {
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


module.exports = router;