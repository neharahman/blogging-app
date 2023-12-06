const { displayAllBlogs, searchBlogs, displayBlogById } = require('../controllers/displayBlogs')
const { updateBlog ,deleteBlog} = require('../controllers/editBlogs')
const { likeBlog, unLikeBlog } = require('../controllers/likeUnlikeBlog')

const route = require('express').Router()

//blog apis
route.post('/display',displayAllBlogs)
route.post('/search',searchBlogs)
route.get('/display/:id',displayBlogById)
route.put('/edit/update/:id',updateBlog)
route.delete('/edit/delete/:id',deleteBlog)
//like blog routes
route.post('/like/:id',likeBlog)
route.post('/unlike/:id',unLikeBlog)

module.exports=route