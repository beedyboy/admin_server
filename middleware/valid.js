
const knex = require('../config/knex').knex; 


  function validate(tbl) {
  return async function (req,res, next) {
    let email = req.body.email; 
    let user = await knex(tbl).where('email', email); 
        if (user.length > 0) res.json({
            status: 400,
            success: false,
            msg: "Email already exist"
        });
        next();
  }
}

 function checkHeader(req, res, next) {
  try {
    if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      const token = req.headers.authorization.split(' ')[1];
      console.log('token', token);
      knex('signatures').where({token}).select().then((data) => {
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
let user = await knex('companies').where('email', email); 
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
  let user = await knex('activations').where({'email': email, 'phone': phone});  
  let rcode = user[0].code; 
  rcode = rcode.replace(/ +/g, ""); 
  if (user.length > 0 && rcode === code) {
    knex('activations').where({ id: user[0].id }).del().then( d => {
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