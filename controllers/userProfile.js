const { verifyToken } = require("../others/jwtToken")
const blogModel = require("../models/blogModel")
module.exports.userProfile = async (req,res) =>{
    try{
        console.log('inside userProfile')
        const {authorization} = req.headers
        const token = await verifyToken(authorization)
        if(token){
            let all_blogs_by_user = await blogModel.find({createdBy:token.obj._id}).populate('createdBy','-password')
            console.log('blogs',all_blogs_by_user)
            res.status(200).json({
                status:'SUCCESS',
                message:'user profile',
                data:all_blogs_by_user
            })
        }
    }catch(err){
        throw new Error(err)
    }
}