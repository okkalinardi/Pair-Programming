const user = require('../models').User
const conj = require('../models').SenimanUser
const seniman = require('../models').Seniman
const passCheck = require('../helper/compareBcrypt')
const status = require('../helper/statusProject')
// const session = require('express-session')

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
                return conj.findOne({ where: { id: req.params.idProject } })
            })
            .then(dataConj => {
                return seniman.findOne({ where: { id: dataConj.SenimanId } })
            })
            .then(dataSeniman => {
                let slotUpdate = dataSeniman.slot + 1
                let hiredUpdate = dataSeniman.isHired - 1
                return seniman.update({
                    slot: slotUpdate,
                    isHired: hiredUpdate,
                    updatedAt: new Date()
                }, { where: { id: dataSeniman.id } })
            })
            .then(selesai => {
                res.redirect(`/user/${req.session.UserId}`)
            })
            .catch(err => {
                res.send(err)
            })
    }

    static userPage(req, res) {
        user.findOne({ where: { id: req.params.id }, include: seniman })
            .then(userData => {
                // res.send(userData)
                for (let i = 0; i < userData.Senimans.length; i++) {
                    userData.Senimans[i].SenimanUser.projectStatus = status(userData.Senimans[i].SenimanUser.projectStatus)
                }
                // res.send(userData)
                res.render('user', { infoUser: userData, userLog: req.session.UserId })
            })
    }

    static pageAdmin(req, res) {
        seniman.findAll({
            include: user,
            order: [
                ["id", "ASC"]
            ]
        })
            .then(datas => {
                for (let i = 0; i < datas.length; i++) {
                    for (let j = 0; j < datas[i].Users.length; j++) {
                        datas[i].Users[j].SenimanUser.projectStatus = status(datas[i].Users[j].SenimanUser.projectStatus)
                    }

                }
                // res.send(datas)
                res.render('pageAdmin', { datas: datas, userLog: req.session.UserId })
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
                res.redirect(`/user/${req.session.UserId}/admin`)
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
                                res.redirect(`/user/${req.session.UserId}/admin`)
                            })
                    })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static logout(req, res) {
        req.session.destroy()
        res.redirect('/')
    }

    static addArtist(req, res) {
        // res.send(req.body)
        seniman.create({
            name: req.body.name,
            email: req.body.email,
            tag: req.body.tag,
            isHired: 0,
            slot: req.body.slot
        })
            .then(() => {
                res.redirect(`/user/${req.session.UserId}/admin`)
            })
            .catch((err) => {
                res.send(err)
            })
    }
}

module.exports = userController
