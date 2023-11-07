const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const userSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    mobile:{
        type:Number,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    }
})

const userModel = mongoose.model('user',userSchema)
module.exports = userModel