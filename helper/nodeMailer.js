const nodemailer = require("nodemailer");
const seniman =require('../models').Seniman
const user =require('../models').User

function mailer(idSeniman, idUser, topik){
    let infoSeniman
    let infoUser
    seniman.findOne({where:{id:idSeniman}})
    .then(dataSeniman=>{
        infoSeniman = dataSeniman
        return user.findOne({where:{id:idUser}})
    })
    .then(dataUser=>{
        infoUser = dataUser

        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth:{
                user: "creaworks2019@gmail.com",
                pass: "CreaWorks12345"
            }
        })
    
        let mailOptions = {
            from: "creaworks2019@gmail.com",
            to: infoSeniman.email, //emailSeniman,
            subject: "You are Hired!",
            html: `<h1>Project Name: ${topik}</h1><br><h2>You are hired by: ${infoUser.name}</h2>`//isi email
        }
    
        transporter.sendMail(mailOptions, (err, data)=>{
            if(err){
                console.log(err)
            }else{
                console.log('email sent')
            }
        })
    })
}

// mailer(1, 2)

module.exports = mailer