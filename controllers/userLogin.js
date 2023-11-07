const userModel = require("../models/userModel")
const { createToken } = require("../others/jwtToken")

module.exports.userLogin = async (req,res) =>{
    try{
        console.log('inside userLogin')
        const {mobile,password} = req.body

        //checking mobile exist in db or not
        const isMobileExistIn_userModel = await userModel.findOne({mobile:mobile})
        console.log(isMobileExistIn_userModel)

        //once isMobileExistIn_userModel is true then check for password
        if(isMobileExistIn_userModel && isMobileExistIn_userModel.password==password){
            //creating token
            const token = await createToken({
                _id:isMobileExistIn_userModel._id,
                mobile:isMobileExistIn_userModel.mobile,
                name:isMobileExistIn_userModel.name})
            res.status(200).json({
                status:'SUCCESS',
                message:'succefully logged in',
                data:token
            })
        }
        else{
            res.status(401).json({
                status:'FAILURE',
                message:'please check the mobile or password'

            })
        }

    }catch(err){
        throw new Error(err)
    }
}