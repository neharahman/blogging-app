const {Schema, default: mongoose} = require('mongoose')

const blogSchema = new Schema({
    title:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    image:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    total_likes:{
        type:Number,
        default:0,
        ref:'likes'
    }
    
})

const blogModel = mongoose.model('blog',blogSchema)
module.exports = blogModel