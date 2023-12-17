const {Schema, default: mongoose} = require('mongoose')
//comment
const commentSchema = new Schema({
    blog_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'blog'
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'user'
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    comment:{
        type:String,
        required:true
    },
    replies:[{
        type:Array,
        ref:'reply'
    }]
})

const commentModel = mongoose.model('comment',commentSchema)
module.exports = commentModel

//reply comments
const replyCommentSchema = new Schema({
    comment_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'comment'
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    comment:{
        type:String
    }
})

const replyCommentModel = mongoose.model('reply',replyCommentSchema)
module.exports = replyCommentModel