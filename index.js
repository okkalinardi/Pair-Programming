const express = require('express')
const app = express()
const port = 3000
const pickProject = require('./routers/pickProject')
const controller = require('./controllers/userController')
var session = require('express-session')
const logCheck = require('./middleware/loginCheck')

app.set('view engine', 'ejs');

app.use(session({
    secret: 'keyboard cat'
}))

app.use(express.urlencoded({ extended: true }))
app.use(express.static('./'))

app.get('/', (req, res) => res.render('index'))
app.post('/', logCheck, controller.userLogin)

const userRoute = require('./routes/user')

app.use('/pick-project', pickProject)

app.use('/user', userRoute)



app.listen(port, () => console.log(`Example app listening on port ${port}!`))