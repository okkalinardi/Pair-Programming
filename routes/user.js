var express = require('express')
var router = express.Router()
const controller = require('../controllers/userController')


router.get('/register', controller.registerUserPage)

router.post('/register', (req, res) => {
    console.log(req.body)
    if (req.body.register) {
        controller.addUser(req, res)
    } else if (req.body.login) {
        controller.userLogin(req, res)
    }
})

router.get('/login', controller.loginPage)

router.post('/login', controller.userLogin)

router.get('/:id/logout', controller.userLogout)


//menampilkan list seniman dan bisa edit delete di setiap actionnya
router.get('/admin', controller.pageAdmin)

//menampilkan form untuk mengedit artist(hanya bisa diakses admin)
router.get('/admin/:senimanId/edit', controller.editArtist)

//update ke database
router.post('/admin/:senimanId/edit', controller.upArtist)

//delete artist dari database
router.get('/admin/:senimanId/delete', controller.deleteArtist)//-- > //in progress

module.exports = router