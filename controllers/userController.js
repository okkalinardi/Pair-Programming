const user = require('../models').User
const conj = require('../models').SenimanUser
const seniman = require('../models').Seniman
const passCheck = require('../helper/compareBcrypt')
// const session = require('express-session')

class userController {
    static addUser(req, res) {
        // console.log(req.body)
        user.create({
            name: req.body.name,
            email: req.body.email,
            isLogin: 0,
            isAdmin: 1,
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
        let userData
        user.findOne({ where: { email: req.body.email } })
            .then(user => {
                userData = user
                return passCheck(req.body.password, user.password)
            })
            .then(success => {
                if (success) {
                    req.session.UserId = userData.id
                    res.redirect(`/user/${req.session.UserId}`)
                    // res.send(req.session)
                    // console.log('INI SESSION===>', req.session)
                } else {
                    res.send('not ok')
                }
            })
            .catch(err => {
                res.send(err)
            })
    }

    static loginPage(req, res) {
        res.render('loginPage')
    }

    static userLogout(req, res) {
        req.session.destroy()
        res.send('berhasil logout')
    }

    static userFinishedProject(req, res) {
        conj.update({
            projectStatus: 1,
            updatedAt: new Date()
        }, {
                where: {
                    id: req.params.idProject
                }
            })
            .then(berhasil => {
                conj.findOne({ where: { id: req.params.idProject } })
            })
            .then(dataConj => {
                seniman.findOne({ where: { id: dataConj.SenimanId } })
            })
            .then(dataSeniman => {
                let slotUpdate = dataSeniman.slot + 1
                seniman.update({
                    slot: slotUpdate,
                    updatedAt: new Date()
                }, { where: { id: dataSeniman.id } })
            })
            .then(selesai => {
                res.redirect('/user')
            })
            .catch(err => {
                res.send(err)
            })
    }

    static userPage(req, res) {
        user.findOne({ where: { id: req.params.id }, include: seniman })
            .then(userData => {
                res.render('user', { infoUser: userData })
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
                        return conj.destroy({
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
