const modelSeniman = require('../models').Seniman
const modelSenimanUser = require('../models').SenimanUser

class ControlSeniman {
    static tampilSeniman(req, res) {
        modelSeniman.findAll()
            .then(datas => {
                let unik = []
                for (let i = 0; i < datas.length; i++) {
                    if (!unik.includes(datas[i].tag)) {
                        unik.push(datas[i].tag)
                    }
                }
                res.render('pickProject', { tags: unik })
            })
    }
    static tampilFilteredSeniman(req, res) {
        // res.send(req.params)
        let listSeniman = []
        modelSeniman.findAll({
            where: {
                tag: req.params.name
            }
        })
            .then(datas => {
                listSeniman = datas
                let arrSeniman = []
                for (let i = 0; i < datas.length; i++) {
                    if (datas[i].isHired === 0) {
                        arrSeniman.push(datas[i])
                    }
                }
                return Promise.all(arrSeniman)
            })
            .then(listSemuaSeniman => {
                // res.send(listSemuaSeniman)
                res.render('listSeniman', { seniman: listSemuaSeniman })
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

}

module.exports = ControlSeniman