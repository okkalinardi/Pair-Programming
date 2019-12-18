const modelSeniman = require('../models').Seniman
const modelSenimanUser = require('../models').SenimanUser
const modelUser = require('../models').User

class ControlSeniman {
    static tampilSeniman(req, res) {
        console.log(req.params.dataUser)
        modelSeniman.findAll()
            .then(datas => {
                let unik = []
                for (let i = 0; i < datas.length; i++) {
                    if (!unik.includes(datas[i].tag)) {
                        unik.push(datas[i].tag)
                    }
                }
                res.render('pickProject', { tags: unik, dataUser: req.params.dataUser })
            })
    }
    static tampilFilteredSeniman(req, res) {
        // res.send(req.params)
        let listSeniman = []
        let infoUser = req.params.dataUser
        modelSeniman.findAll({
            where: {
                tag: req.params.name
            }
        })
            .then(datas => {
                // res.send(datas)
                listSeniman = datas
                let arrSeniman = []
                for (let i = 0; i < datas.length; i++) {
                    if ((datas[i].slot - datas[i].isHired) > 0) {
                        arrSeniman.push(datas[i])
                    }
                }
                return Promise.all(arrSeniman)
            })
            .then(listSemuaSeniman => {
                // res.send(listSemuaSeniman)
                res.render('listSeniman', { seniman: listSemuaSeniman, dataUser: infoUser })
            })
    }
    static tampilProfileSeniman(req, res) {
        modelSeniman.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(data => {
                // res.send(data)
                res.render('profileSeniman', { seniman: data })
            })
    }

    static hireSeniman(req, res) {
        // res.send(req.body)
        let infoUser
        modelUser.findOne({
            where: {
                id: req.params.dataUser
            }
        })
            .then(user => {
                // res.send(user)
                infoUser = user
                return modelSenimanUser.create({
                    UserId: user.id,
                    SenimanId: req.body.id,
                    projectStatus: 0,
                    projectName: req.body.deskripsi
                })
                    .then(() => {
                        // res.redirect('/user')
                        return modelSeniman.findOne({
                            where: {
                                id: req.body.id
                            }
                        })
                            .then(siSeniman => {
                                let hired = siSeniman.isHired
                                let ubah = hired + 1
                                return modelSeniman.update({
                                    isHired: ubah,
                                    updatedAt: new Date()
                                }, {
                                    where: {
                                        id: req.body.id
                                    }
                                    })
                            })
                            .then(() => {
                                res.redirect('/user')
                            })
                    })
            })


    }

}

module.exports = ControlSeniman