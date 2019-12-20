const seniman = require('express').Router()
const ControlSeniman = require('../Controller/ControlSeniman.js')
const logCheck = require('../middleware/loginCheck')
const userCheck = require('../middleware/userCheck')

// seniman.use(userCheck)
//menampilkan list kategori seni untuk user yang login
seniman.get('/:dataUser', ControlSeniman.tampilSeniman)
// seniman.get('/', ControlSeniman.tampilSeniman)

//menampilkan list seniman sesuai kategori dan ada slot
seniman.get('/:dataUser/:name', ControlSeniman.tampilFilteredSeniman)
// seniman.get('/:name', ControlSeniman.tampilFilteredSeniman)

//menampilkan profil seniman
seniman.get('/:dataUser/:tag/:id', ControlSeniman.tampilProfileSeniman)

//nambah di isHired slot jgn ngurang
//menghire seniman, nambahin di database conjunction
seniman.post('/:dataUser/:tag/:id', ControlSeniman.hireSeniman)
// seniman.post('/:tag/:id', ControlSeniman.hireSeniman)

module.exports = seniman