var express = require('express')
var router = express.Router()
const controller = require('../controllers/userController')

router.get('/', controller.registerUserPage)

router.post('/', controller.addUser)

router.get('/login', controller.loginPage)

router.post('/login', controller.userLogin)

router.get('/:id/logout', controller.userLogout)

module.exports = router