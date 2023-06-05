// const { userValidation } = require('../middleware/validation/user.valid')
const { signup, signin, emailVerify } = require('../services/user.service')



const app = require('express').Router()

app.post('/signup',signup)
app.post('/signin',signin)
app.get('/verify/:token',emailVerify)


module.exports=app