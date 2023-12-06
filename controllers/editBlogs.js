const blogModel = require("../models/blogModel")
const { verifyToken } = require("../others/jwtToken")

//update blog controllers
module.exports.updateBlog = async (req,res) =>{
    try{
        console.log('inside updateBlog')
        const {authorization} = req.headers
        const {title,description} = req.body
        const {id} = req.params
        const token = await verifyToken(authorization)
        if(token){
            const blog_createdBy_user = await blogModel.find({createdBy:token.obj._id}).populate('createdBy','-password')
            console.log(blog_createdBy_user)
            let updateObj = {}
            if(title) updateObj['title'] = title
            if(description) updateObj['description'] = description
            console.log(updateObj)

            const update_blog = await blogModel.updateOne({_id:id},{$set:updateObj},{upsert: true})
            console.log('update',update_blog)
            res.status(200).json({
                status:'success',
                message:'updated'
            })
        }
        else{
            res.status(401).json({
                message:'please signup/login first'
            })
        }
    }catch(err){
        console.log('error inside updateBlog')
        throw new Error(err)
    }
}


//delete Blog controllers
module.exports.deleteBlog = async (req,res) =>{
    try{
        console.log('inside delete blog')
        const {authorization} = req.headers
        const {id} = req.params
        console.log(id)
        const token = await verifyToken(authorization)
        console.log(token)
        if(token){
            const blog_createdBy_user = await blogModel.find({createdBy:token.obj._id}).populate('createdBy', '-password')
            console.log(blog_createdBy_user)
            if(blog_createdBy_user._id){
                const delete_blog = await blogModel.deleteOne({_id:id})
                res.status(201).json({
                    message:'successfully deleted',
                    data:delete_blog
                })
            }
            else{
                res.status(500).json({
                    message:'something went wrong please try again'
                })
            }
        }
        else{
            res.status(401).json({
                message:'please signup/login first'
            })
        }

    }catch(err){
        console.log('error inside deleteBlog')
        throw new Error(err)
    }
}