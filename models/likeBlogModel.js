const {Schema, default: mongoose} = require('mongoose')

const blogLikeSchema = new Schema({
    blog_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'blog'
    },
    user_id:[{
        type:mongoose.Schema.Types.ObjectId,
        unique:true,
        ref:'user'
    }]
})

const likeBlogModel = mongoose.model('likes',blogLikeSchema)
module.exports = likeBlogModel