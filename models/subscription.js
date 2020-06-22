const express = require('express');
const knex = require('../config/knex').knex;
// const router = require('express').Router;

const router = express.Router();

// const router = Router();

router.get("/:plan", (req, res) => { 
    const name = req.params.plan;
        const result = knex('subscriptions').where('plan', name).select('id', 'amount').then( ( data ) => { 
            // console.log("R", res);
             res.send( data ).status(200);
            
            
             });
});

router.get("/", (req, res) => {  
    console.log("someone is trying to get to me");
        const result = knex('subscriptions').select().then( ( data ) => { 
            // console.log("R", res);
             res.send( data ).status(200);
            
            
             });
});

router.post("/", (req, res) => {
    const {plan, amount, sms, description} = req.body; 
    const created_at = new Date().toLocaleString();
    knex('subscriptions').insert({  plan, amount, sms, description, created_at }).then( ( result ) => { 
        console.log("RESULT", result);
        if(result) {
            res.send( {
                status: 200,
                message: 'Package created successfully'
                } );
        } else {
            res.send({
                status: 204,
                message: 'Package not created'
            })
        }
    });
    // res.send("Searching for " + req.params.name);
});

// router.get("/books/:id", BookController.showBook);

// router.post("/books", BookController.addBook);

// router.patch("/books/:id", BookController.updateBook);


// router.delete("/books/:id", BookController.deleteBook);


// export default router;
module.exports = router;