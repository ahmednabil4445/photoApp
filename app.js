const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT
const mongoose=require('mongoose')

app.use(express.json())
app.use('/users',require('./api/user.api'))
app.use('/photos',require('./api/photo.api'))





mongoose.connect(process.env.CONNECTION_STRING).then(()=>{
    console.log("connected");
}).catch((err)=>{
    console.log(err);
})

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port.... ${port}!`))