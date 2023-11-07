const userModel = require("../models/userModel")
const { createToken } = require("../others/jwtToken")

module.exports.userRegister = async (req,res) =>{
    try{
        console.log('inside userRegister')
        const {name,mobile,email,password,confirmed_password} = req.body
        console.log(name,mobile,email,password,confirmed_password)
        if(password==confirmed_password){
            //inserting data in db
            const insert_userModel = await new userModel({
                name,mobile,email,password
            })
            const save_insert_userModel = await insert_userModel.save()
            //creating token
            const token = await createToken({
                _id:save_insert_userModel._id,
                name:save_insert_userModel.name,
                email:save_insert_userModel.email,
                mobile:save_insert_userModel.mobile})
        
            res.status(200).json({
                status:'SUCCESS',
                message:'successfully user registered',
                data:token
            })
        }
    }catch(err){
        throw new Error(err)
    }
}