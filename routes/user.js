var express = require('express')
var router = express.Router()
const controller = require('../controllers/userController')
const logCheck = require('../middleware/loginCheck')
const userCheck = require('../middleware/userCheck')
const app = express()

router.get('/',userCheck, function(req, res){
    res.redirect(`/${req.session.UserId}`)
})

router.get('/:id',userCheck, controller.userPage)

router.get('/register', controller.registerUserPage)

router.post('/register', (req, res)=>{
    // console.log(req.body)
    if(req.body.register){
        controller.addUser(req, res)
    }else if(req.body.login){
        controller.userLogin(req, res)
    }
})


router.get('/login', function(req, res){
    res.render('loginPage')
})

router.post('/login', controller.userLogin)

router.get('/:id/logout', controller.userLogout)

router.get('/:idProject/selesai', controller.userFinishedProject)

module.exports = router