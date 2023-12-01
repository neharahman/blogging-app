const { createBlog } = require('../controllers/createBlog')
const { userLogin } = require('../controllers/userLogin')
const { userProfile } = require('../controllers/userProfile')
const { userRegister } = require('../controllers/userRegister')

const route = require('express').Router()

route.get('/home',(req,res)=>{
    res.send('hello home')
})
route.post('/register',userRegister)
route.post('/login',userLogin)
route.post('/create-blog',createBlog)
route.post('/login/profile',userProfile)
module.exports=route