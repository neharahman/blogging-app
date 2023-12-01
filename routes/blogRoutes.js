const { displayAllBlogs, searchBlogs } = require('../controllers/displayBlogs')
const { updateBlog } = require('../controllers/editBlogs')

const route = require('express').Router()

route.post('/display',displayAllBlogs)
route.post('/search',searchBlogs)
route.post('/update',updateBlog)

module.exports=route