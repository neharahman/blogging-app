const {Schema, default: mongoose} = require('mongoose')

const blogSchema = new Schema({
    title:{
        type:String,
        required: true
    },
    discription:{
        type:String,
        required: true
    },
    image:{
        type:String
    },
    createdAt:{
        type:String
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
    
})

const blogModel = mongoose.model('blog',blogSchema)
module.exports = blogModel