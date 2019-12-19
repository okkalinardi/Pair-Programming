const express = require('express')
const app = express()
const port = 3000
const pickProject = require('./routers/pickProject')
const controlUser = require('./controllers/userController')


app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }))
app.use(express.static('./'))

app.get('/', (req, res) => res.render('index'))
app.post('/', controlUser.userLogin)

const userRoute = require('./routes/user')

app.use('/pick-project', pickProject)

app.use('/user', userRoute)



app.listen(port, () => console.log(`Example app listening on port ${port}!`))