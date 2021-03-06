var express = require('express')
var router = express.Router()
const controller = require('../controllers/userController')
const logCheck = require('../middleware/loginCheck')
const userCheck = require('../middleware/userCheck')
const app = express()



// router.use(userCheck)

router.get('/', function (req, res) {
    res.redirect(`user/${req.session.UserId}`)
})

// router.use(userCheck)

router.get('/:id',userCheck, controller.userPage)

router.post('/:id', logCheck, controller.userLogin)

router.get('/:id/register', controller.registerUserPage)

router.post('/:id/register', (req, res) => {
    // console.log(req.body)
    if (req.body.register) {
        controller.addUser(req, res)
    } else if (req.body.login) {
        controller.userLogin(req, res)
    }
})


router.get('/:id/login', function (req, res) {
    res.render('loginPage')
})

router.post('/:id/login', controller.userLogin)

//menampilkan list seniman dan bisa edit delete di setiap actionnya
router.get('/:id/admin', controller.pageAdmin)
router.post('/:id/admin', controller.addArtist)

//menampilkan form untuk mengedit artist(hanya bisa diakses admin)
router.get('/:id/admin/:senimanId/edit', controller.editArtist)

//update ke database
router.post('/:id/admin/:senimanId/edit', controller.upArtist)

//delete artist dari database
router.get('/:id/admin/:senimanId/delete', controller.deleteArtist)

router.get('/:id/:idProject/selesai', controller.userFinishedProject)



module.exports = router