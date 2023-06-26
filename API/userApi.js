//create mini-express(seperate roter) app

const exp=require("express")
const userApp=exp.Router()

require('dotenv').config()

//import express-async-hanlder
const expressAsyncHandler=require('express-async-handler')


const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const tokenverify=require("./middleware/tokenverify")
//body parser
userApp.use(exp.json())
//CREATE USER API
 
//register user
userApp.post('/register-user',expressAsyncHandler(async(request,response)=>{
    //get usercollection 
    const userCollectionObj=request.app.get('userCollection')

    //get users from client
    const newUser=request.body

    //verify user is already existed
    const userOfDb=await userCollectionObj.findOne({username:newUser.username})
    
    //if user already existed
    if(userOfDb!==null){
        response.status(200).send({message:"user already existed"})
    }
    //if new user
    else{

        //hash the password
        let hashPassword=await bcrypt.hash(newUser.password,6 )
        //replace plain password with hashed password
        newUser.password=hashPassword
        //insert user
        await userCollectionObj.insertOne(newUser)
        response.status(201).send({message:"user created"})
    }
    
}))

//get user by username
userApp.get("/get-user/:username",tokenverify,expressAsyncHandler(async(request,response)=>{
    //get user collection
    const userCollectionObj=request.app.get("userCollection")

    //get username from url
    let usernameOfUrl=request.params.username

    //find user by username
    let user=await userCollectionObj.findOne({username:usernameOfUrl})

    //send res
    response.status(200).send({message:"user",payload:user})

}))


//user login
//PUBLIC ROUTE
userApp.post('/login-user',expressAsyncHandler(async(request,response)=>{

    //get user collection
    const userCollectionObj=request.app.get("userCollection")

    //get username from url
    let userCredObj=request.body

    //verify user is already existed
    let userOfDb=await userCollectionObj.findOne({username:userCredObj.username})
    
    //if user not exist
    if(userOfDb===null){
        response.status(200).send({message:"invalid username"})
    }
    //ifuser is valid
    else{
        //compare passwords
        let isEqual=await bcrypt.compare(userCredObj.password,userOfDb.password)

        //if password not matched
        if(isEqual===false){
            response.status(200).send({message:"invalid password"})
        }
        //password matched
        else{
            //create JWT token
            let signedJWTTOKEN=jwt.sign({username:userOfDb.username},process.env.SECRET_KEY,{expiresIn:30})
            //send token to response
            response.status(200).send({message:"success",token:signedJWTTOKEN,user:userOfDb})
        }

    }

}))

//export express app
module.exports=userApp
