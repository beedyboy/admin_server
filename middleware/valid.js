
const db = require('../config/knex'); 

function validate(tbl) {
  return async function (req,res, next) {
   try {
    let email = req.body.email; 
    await db(tbl).where('email', email).then( (user) => { 
      if (user.length > 0) {
        res.json({
          status: 400,
          success: false,
          msg: "Email already exist"
      });
      } else {
        next();
      }
    })
   
   } catch (error) {
     console.log('err', err);
     
   }
  }
}
  

 function checkHeader(req, res, next) {
  try {
    if(req.headers.authorization && (req.headers.authorization.split(' ')[0] === 'bearer' || req.headers.authorization.split(' ')[0] === 'Bearer')) {
      const token = req.headers.authorization.split(' ')[1];
      console.log('token', token);
      db('signatures').where({token}).select().then((data) => {
        console.log(data);
        if (data) {
          next();
        } else {
          res.json({
            status: 404,
            success: false,
            msg: "Invalid token! Please login again"
        });
        }
      })
    }
} catch (err) {
  console.log('error', err);
}
 }

  async function valid(req, res, next) {
    let email = req.body.email; 
let user = await db('companies').where('email', email); 
        if (user.length > 0) return res.json({
            status: 400,
            success: false,
            msg: "Email already exist"
        });
        next();
 
}

async function verify(req,res, next) {
  let email = req.body.email; 
  let phone= req.body.phone;
  let code = req.body.code;
  let user = await db('activations').where({'email': email, 'phone': phone});  
  let rcode = user[0].code; 
  rcode = rcode.replace(/ +/g, ""); 
  if (user.length > 0 && rcode === code) {
    db('activations').where({ id: user[0].id }).del().then( d => {
      next();
    });   

  } else {
      return res.json({
      status: 400, 
      msg: "Wrong validation code"
    });

  }


}

module.exports = {valid, validate, checkHeader, verify}