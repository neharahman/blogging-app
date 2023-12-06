const mongoose = require('mongoose')
const blogModel = require("../models/blogModel")
const { verifyToken } = require("../others/jwtToken")

module.exports.displayAllBlogs = async (req,res) =>{
    try{
        console.log('inside displayBlogs')
        const {authorization} = req.headers
        const token = await verifyToken(authorization)
        if(token) {
            const displayAllBlogs = await blogModel.find()
            res.status(200).json({
                status:'SUCCESS',
                message:'diplaying all the blogs',
                data:displayAllBlogs
            })
        }

    }catch(err){
        throw new Error(err)
    }
}

//searching blogs
module.exports.searchBlogs = async (req,res) =>{
    try{
        console.log('inside searchBlogs')
        const {searchTerm} = req.body
        const {authorization} = req.headers
        const token = await verifyToken(authorization)
        if(token){
            const noSpecialCharIn_search = searchTerm.replace(/[^a-zA-Z0-9 ]/g,"")
            const x=new RegExp(noSpecialCharIn_search)
            console.log('x:',x)
            const data = await blogModel.find({
                $or:[
                    {
                        title: {$regex: new RegExp(noSpecialCharIn_search,'i')}
                    },
                    {
                        description: {$regex: new RegExp(noSpecialCharIn_search,'i')}
                    }
                ]
            })
            res.send(data)
        }
        else{
            res.status(401).json({
                status:'Failure',
                message:'please signup/login first'
            })
        }
    }catch(err){
        throw new Error(err)
    }
}


//search by id get....................................................
module.exports.displayBlogById = async (req,res) =>{
    try{
        console.log('inside dispalyBlogById')
        const {id} = req.params
        console.log(id)
        const findBlogById = await blogModel.findById({_id:id})
        console.log(findBlogById)
        res.status(200).json({
            status:'success',
            message:'blog display by id',
            data:findBlogById
        })
    }catch(err){
        console.log('error inside displayBlogById')
        throw new Error(err)
    }
}