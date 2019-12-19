const user = require('../models').User
const hashPass = require('../helper/passwordHash')
const seniman = require('../models').Seniman
const senimanUser = require('../models').SenimanUser

class userController {
    static addUser(req, res) {
        // console.log(req.body)
        user.create({
            name: req.body.name,
            email: req.body.email,
            isLogin: 0,
            isAdmin: 0,
            password: req.body.password
        })
            .then(data => {
                // res.send('SUKSES')
                res.render('user', { dataUser: data })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static registerUserPage(req, res) {
        // res.send('test')
        res.render('registerUser')
    }

    static userLogin(req, res) {
        let infoUser
        user.findOne({ where: { isLogin: 1 } })
            .then(loginData => {
                if (loginData) {
                    res.send('sedang ada yang login')
                } else {
                    return user.findOne({ where: { email: req.body.email } })
                }
            })
            .then(userData => {
                if (!userData) {
                    res.send('email tidak ditemukan')
                } else {
                    infoUser = userData
                    let pwdInput = hashPass(req.body.password, userData.secret)
                    if (pwdInput == userData.password) {
                        return user.update({
                            isLogin: 1,
                            updatedAt: new Date()
                        }, {
                                where: {
                                    email: userData.email
                                }
                            })
                    } else {
                        res.send('salah password')
                    }
                }
            })
            .then(data => {
                res.send('berhasil masuk')
                // res.render('user', { dataUser: infoUser })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static loginPage(req, res) {
        res.render('loginPage')
    }

    static userLogout(req, res) {
        user.update({
            isLogin: 0,
            updatedAt: new Date()
        }, {
                where: {
                    id: req.params.id
                }
            })
            .then(data => {
                res.send('berhasil logout')
            })
            .catch(err => {
                res.send(err)
            })
    }

    static pageAdmin(req, res) {
        seniman.findAll({
            include: user
        }, {
                order: [
                    ["id", "ASC"]
                ]
            })
            .then(datas => {
                // res.send(datas)
                res.render('pageAdmin', { datas: datas })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static editArtist(req, res) {
        // res.send(req.params)
        seniman.findOne({
            where: {
                id: req.params.senimanId
            }
        })
            .then(data => {
                res.render('formEditArtist', { data: data })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static upArtist(req, res) {
        // res.send(req.body)
        seniman.update({
            name: req.body.name,
            email: req.body.email,
            tag: req.body.tag
        }, {
                where: {
                    id: req.params.senimanId
                }
            })
            .then(() => {
                res.redirect('/user/admin')
            })
    }

    static deleteArtist(req, res) {
        let found
        seniman.findOne({
            where: {
                id: req.params.senimanId
            }
        })
            .then(datas => {
                found = datas
                // res.send(datas)
                return seniman.destroy({
                    where: {
                        id: datas.id
                    }
                })
                    .then(() => {
                        return senimanUser.destroy({
                            where: {
                                SenimanId: found.id
                            }
                        })
                            .then(() => {
                                res.redirect('/user/admin')
                            })
                    })
            })
            .catch(err => {
                res.send(err)
            })
    }
}

module.exports = userController
