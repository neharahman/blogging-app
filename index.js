const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/userRoutes.js')
const blogRoutes = require('./routes/blogRoutes.js')
require('dotenv').config()

//body parser
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())
app.use(fileUpload())

//db connect
const db = process.env.DATABASE.replace('<password>',process.env.DB_PASSWORD).replace('<username>',process.env.DB_USERNAME)
mongoose.connect(db).then(()=>console.log('db connected')).catch(err=>console.log(err))

app.get('/',(req,res)=>{
    res.send('hello bloging app')
})
app.use('/',userRoutes)
app.use('/blog',blogRoutes)

app.listen(process.env.PORT,()=>{
    console.log('listening to the server',process.env.PORT)
})