const user = require('../models').User
const hashPass = require('../helper/passwordHash')

class userController{
    static addUser(req, res){
        // console.log(req.body)
        user.create({
            name: req.body.name,
            email: req.body.email,
            isLogin: 0,
            isAdmin: 0,
            password: req.body.password
        })
        .then(data=>{
            res.send('SUKSES regist')
        })
        .catch(err=>{
            res.send(err)
        })
    }

    static registerUserPage(req, res){
        // res.send('test')
        res.render('registerUser')
    }

    static userLogin(req, res){
        let userInfo
        user.findOne({where:{isLogin : 1}})
        .then(loginData=>{
            if(loginData){
                res.send('sedang ada yang login')
            }else{
                 return user.findOne({where:{email:req.body.email}})
            }
        })
        .then(userData=>{
            userInfo = userData
            if(!userData){
                res.send('email tidak ditemukan')
            }else{
            let pwdInput = hashPass(req.body.password, userData.secret)
            if(pwdInput==userData.password){
                return user.update({
                    isLogin: 1,
                    updatedAt: new Date()
                }, {
                    where: {
                        email: userData.email
                    }
                })
            }else{
                res.send('salah password')
            }
        }
        })
        .then(data=>{
            res.send('sukses login')
        })
        .catch(err=>{
            res.send(err)
        })
    }

    static loginPage(req, res){
        res.render('loginPage')
    }

    static userLogout(req, res){
        user.update({
            isLogin: 0,
            updatedAt: new Date()
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(data=>{
            res.send('berhasil logout')
        })
        .catch(err=>{
            res.send(err)
        })
    }
}

module.exports = userController
