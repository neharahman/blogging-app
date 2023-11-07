const blogModel = require("../models/blogModel")
const { verifyToken } = require("../others/jwtToken")
const AWS = require('aws-sdk');
require("aws-sdk/lib/maintenance_mode_message").suppress = true;

//initializing s3
const AWSCredentials = {
    accessKey: process.env.S3_ACCESS_KEY,
    secret: process.env.S3_SECRET ,
    bucketName: process.env.S3_BUCKET_NAME
};

const s3 = new AWS.S3({
    accessKeyId: AWSCredentials.accessKey,
    secretAccessKey: AWSCredentials.secret
});

module.exports.createBlog = async (req,res) => {
    try{
        console.log('inside createBlog')
        const {title,discription,createdAt,createdBy} = req.body
        const {authorization} = req.headers
        const file = req.files.image
        console.log('file',file)

        const token = await verifyToken(authorization)
        if(token){
            //adding the image to s3
            const params = {
                Bucket: AWSCredentials.bucketName,
                Key: file.name,
                Body: file.data
            };
            let url = await s3.putObject(params).promise()
            console.log('url',url)
            
            //inserting data into db
            const insert_blogModel = await blogModel({
                title,
                discription,
                image:`https://my-blogging.s3.ap-south-1.amazonaws.com/${file.name}`,
                createdAt,
                createdBy
            })
            const save_blogModel = await insert_blogModel.save()
            res.status(200).json({
                status:'SUCCESS',
                message:'successfully blog created',
                data:save_blogModel
            })
        }
        else{
            res.status(401).json({
                status:'FAILURE',
                message:'please login/signup first to create blog'
            })
        }
    }catch(err){
        throw new Error(err)
    }
}