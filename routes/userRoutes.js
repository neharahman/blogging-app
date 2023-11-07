const { createBlog } = require('../controllers/createBlog')
const { userLogin } = require('../controllers/userLogin')
const { userRegister } = require('../controllers/userRegister')

const route = require('express').Router()

route.get('/home',(req,res)=>{
    res.send('hello home')
})
route.post('/register',userRegister)
route.post('/login',userLogin)
route.post('/create-blog',createBlog)
module.exports=route