const { verifyToken } = require("../others/jwtToken")
module.exports.commentBlog = async (req,res) =>{
    try{
        console.log('inside commentBlog')
        const {authorization} = req.headers
        const {blog_id} = req.params
        const {comment} = req.body
        const token = await verifyToken(authorization)
        if(token){
            if(blog_id){

                |
            }
        }
        else{
            res.status(401).json({
                message:'please login first'
            })
        }

    }catch(err){
        console.log('error inside commentBlog')
    }
}