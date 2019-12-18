var express = require('express')
var router = express.Router()
const controller = require('../controllers/userController')

router.get('/')

router.get('/register', controller.registerUserPage)

router.post('/register', (req, res)=>{
    console.log(req.body)
    if(req.body.register){
        controller.addUser(req, res)
    }else if(req.body.login){
        controller.userLogin(req, res)
    }
})

router.get('/login', controller.loginPage)

router.post('/login', controller.userLogin)

router.get('/:id/logout', controller.userLogout)

module.exports = router