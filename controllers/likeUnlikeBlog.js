const { default: mongoose } = require("mongoose")
const blogModel = require("../models/blogModel")
const { verifyToken } = require("../others/jwtToken")
const likeBlogModel = require("../models/likeBlogModel")

module.exports.likeBlog = async (req,res) =>{
    try{
        console.log('inside likeBlog')
        const {authorization} = req.headers
        //blog_id from params
        const {id} = req.params
        if(!mongoose.Types.ObjectId.isValid(id)){
            res.status(400).json({
                message:'invalid blog id'
            })
        }
        console.log(id)
        const token = await verifyToken(authorization)
        if(token){
            const isBlog_idExist = await blogModel.findById({_id:id})
            //console.log(isBlog_idExist)
            if(!isBlog_idExist){
                res.status(204).json({
                    message:'no blog found'
                })
            }
            else{
                //checking whether blog id is already present in the likeModel
                console.log('id',id)
                const already_blogId = await likeBlogModel.findOne({blog_id:id})
                console.log(already_blogId)
                if(!already_blogId){
                    const inserIn_likeBlogModel = await likeBlogModel({
                        blog_id:id,
                        user_id:[token.obj._id],
                    })
                    const save_inserIn_likeBlogModel = await inserIn_likeBlogModel.save()
                    //and also update the blog table total likes
                    res.status(200).json({
                        status:'success',
                        message:'successfully liked the post',
                        data:save_inserIn_likeBlogModel
                    })
                }
                else{
                    const updateTotalLikesBlogModel = await blogModel.findByIdAndUpdate({_id:already_blogId.blog_id},{total_likes:already_blogId.user_id.length})
                    console.log('hello blogModel',updateTotalLikesBlogModel)
                    const updateBlogLikeModel = await likeBlogModel.findByIdAndUpdate({_id:already_blogId._id},
                        {$addToSet:{user_id:token.obj._id}},
                        {new:true}).lean()
                    res.status(200).json({
                        status:'success',
                        message:'successfully liked the post',
                        data:updateBlogLikeModel
                    })
                }
            }
        }
    }catch(err){
        console.log('error inside likeBlog')
        throw new Error(err)

    }
}


//unlike the blog
module.exports.unLikeBlog = async (req,res) =>{
    try{
        console.log('inside unLikeBlog')
        const {authorization} = req.headers
        //blog_id from params
        const {id} = req.params
        if(!mongoose.Types.ObjectId.isValid(id)){
            res.status(400).json({
                message:'invalid blog id'
            })
        }
        const token = await verifyToken(authorization)
        if(token){
            const isBlog_idExist = await likeBlogModel.findOne({blog_id:id})
            
            const unLike = await likeBlogModel.findByIdAndUpdate({_id:isBlog_idExist._id},
                {
                $pull:{user_id:token.obj._id}
                },
                {new:true}
                )
            res.status(200).json({
                message:'unliked the post',
                data:unLike
            })
        }
        

    }catch(err){
        console.log('error inside unLikeBlog')
        throw new Error(err)
    }
}