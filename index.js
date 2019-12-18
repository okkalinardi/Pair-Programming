const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs');
app.use(express.static('./'))

app.use(express.urlencoded({extended:true}))

app.get('/', (req, res) => res.render('index'))

const userRoute = require('./routes/user')

app.use('/user', userRoute)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))