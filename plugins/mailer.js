const nodemailer = require('nodemailer');

exports.sendMail = function(subject, receiver, body){
    let transport = nodemailer.createTransport({
        // host: 'smtp.etheral.email',
        host: 'smtp.gmail.com',
        port: 587,
        // secure: false, //true for 465, false for other ports
        service: 'gmail',
        auth: {
            user: 'boladebode@gmail.com',
            pass: 'Salvation91#'
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    
    const mailOptions = {
        from: 'boladebode@gmail.com', //sender address
        to: receiver,//list of receivers
        subject: subject,
        // text: body,//plain tcext body
        html: body, //html body
    };
    
    transport.sendMail(mailOptions, function (error, info) {
        console.log(info.messageId);
        if(error) {
            console.log(error);
        } else {
            console.log(info);
        }
    });

    return ;
}