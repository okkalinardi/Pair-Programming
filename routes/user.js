var express = require('express')
var router = express.Router()
const controller = require('../controllers/userController')
const logCheck = require('../middleware/loginCheck')
const userCheck = require('../middleware/userCheck')
const app = express()

router.get('/', function (req, res) {
    res.redirect(`/${req.session.UserId}`)
})

router.get('/:id', controller.userPage)

router.get('/register', controller.registerUserPage)

router.post('/register', (req, res) => {
    // console.log(req.body)
    if (req.body.register) {
        controller.addUser(req, res)
    } else if (req.body.login) {
        controller.userLogin(req, res)
    }
})


router.get('/login', function (req, res) {
    res.render('loginPage')
})

router.post('/login', controller.userLogin)

router.get('/:id/logout', controller.userLogout)


//menampilkan list seniman dan bisa edit delete di setiap actionnya
router.get('/admin', controller.pageAdmin)

//menampilkan form untuk mengedit artist(hanya bisa diakses admin)
router.get('/admin/:senimanId/edit', controller.editArtist)

//update ke database
router.post('/admin/:senimanId/edit', controller.upArtist)

//delete artist dari database
router.get('/admin/:senimanId/delete', controller.deleteArtist)
router.get('/:idProject/selesai', controller.userFinishedProject)

module.exports = router