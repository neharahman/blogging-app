const blogModel = require("../models/blogModel")
const { verifyToken } = require("../others/jwtToken")

module.exports.updateBlog = async (req,res) =>{
    try{
        console.log('inside updateBlog')
        const {authorization} = req.headers
        const token = await verifyToken(authorization)
        if(token){
            const blog_createdBy_user = await blogModel.find({createdBy:token.obj._id}).populate('createdBy','-password')
            console.log(blog_createdBy_user)
            const update_blog = await blogModel.findByIdAndUpdate({_id:blog_createdBy_user[0]._id},{$or:[{title:'hello express js '},{description:'hello expressjs i am upadting you'}]})
            console.log('update',update_blog)
            res.status(200).json({
                status:'success',
                message:'updated'
            })
        }

    }catch(err){
        console.log('error inside updateBlog')
        throw new Error(err)
    }
}