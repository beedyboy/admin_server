const bcrypt = require("bcryptjs");
const crypto = require('crypto-js');
const jwt = require('jsonwebtoken');
const db = require('../config/knex'); 
const util = require('../config/util').get(process.env.NODE_ENV);

const helper = { 
  emailExist: (tbl, email) => {  
    let ans = {exist: false};
    db(tbl).where({email}).select('email').then( ( data ) => { 
    console.log(data, data.length); 
     if(data.length > 0) {
      ans = {exist: true};
      console.log('greaten than zero');
    } else {
      ans = {exist: false};
      console.log('less than one');
    }
    }); 
    return ans;
    
  },
    
nameExist: async (tbl, name) => {
 await db(tbl).where({name}).select().then( ( data ) => { 
   if(data.length > 0) { 
         return true;
     }
       return false;
              
    });

},
isThereToken: (req) => {
  let data = {}; 
  if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'bearer' ||
   req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    const token = req.headers.authorization.split(' ')[1];  
    data = {
      exist: true,
      token
    };
  } else {
    data = {exist: false};
  }
  return data;
},

getProfile: (req, tbl, id) => {
  let payload = {};
  try {
    
    const verify = helper.isThereToken(req);
    if(verify && verify.exist === true) {
      const token = verify.token; 
      db('signatures').where({token}).select(id).then((data) => { 
        if (data) {
          db(tbl).where('id', data[0][id]).then((res) => {
            // console.log('profile', res[0]);
             payload.exist = true;
             payload.data = res[0];
           
          }) 
        
        } else {
           
             payload.exist = false;
             payload.msg ='Invalid token, please sign in and try again!';
          
        }
      })
    } else {
      payload.exist = false;
      payload.msg ='Invalid token, please sign in and try again!';
      
    }
    
} catch (err) {
  console.log('error', err);
}
return payload;
},
      
hash: (password) => {
    const salt = bcrypt.genSaltSync();
    return  bcrypt.hashSync(password, salt);
  },
  
generateToken: async (user) => {
    // var token =  await jwt.sign(3, process.env.SECRET_KEY); 
    var token = '';
    try {
      const id = user.id; 
    token = await crypto.AES.encrypt(id.toString(), process.env.SECRET_KEY).toString(); 
    return token;
    } catch(err) {
      console.log('error', err);
    } 
  },

getRandomizer: (bottom, top) => {
    return function() {
        return Math.floor( Math.random() * ( 1 + top - bottom ) ) + bottom;
    }
},
generateOTP: () => {
  var rollDie = helper.getRandomizer(0, 9);

  var results = ""
  for ( var i = 0; i<7; i++ ) {
      results += rollDie() + " ";    //make a string filled with 1000 random numbers in the range 1-6.
  }
  return results;
},
setSignature: (token, col, id) => {
  let reply = false;
   db('signatures').where(col, id).update( 'token', token).then( data => {
              if (data){
                reply = true; }
                 else {reply = false; }
               });
  return reply;
},
setActivation: (email, phone, code, status) => {
  db('activations').insert({ email, phone, code, status }).then( (res) => {
    return res;
  })
},
actDCTLogin: async ( col, id, value) => {
  // console.log(col, id, value);
  var reply = false;
    const updated_at = new Date().toLocaleString();  
   await db('logins').where(col, id).update('status', value)
   .update('updated_at', updated_at).then( data => {
  if (data > 0){
     reply = true;
     }
  else {reply = false; }
   
  }).catch(err => {
    console.log(err);
   }); 
  return reply;
},
createBuyerSettings: async ( id, created_at) => { 
  var reply = false; 
   await db('settings').insert({ buyer_id: id, created_at }).then( data => { 
  if (data){
     reply = true;
     } else {reply = false; }
  }).catch(err => {
    console.log(err);
   }); 
  return reply;
},
createSellerSettings: async ( id, created_at) => { 
  var reply = false; 
   await db('settings').insert({ shop_id: id, created_at }).then( data => { 
  if (data){
     reply = true;
     } else {reply = false; }
  }).catch(err => {
    console.log(err);
   }); 
  return reply;
},

  
}

module.exports = helper;