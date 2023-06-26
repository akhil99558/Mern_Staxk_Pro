const jwt=require("jsonwebtoken")
require('dotenv').config()
const tokenverify=(request,response,next)=>{
    //token verification logic
     
    //get bearer token from headers of req
    let bearerToken=request.headers.authorization
    //if bearer token is not existed, unauthorized req
    if(bearerToken===undefined){
        response.send({message:"unauthorized request"})
    }
    //if bearer token is existed, get token
    else{
        const token=bearerToken.split(" ")[1]
        //verify token using secret key
        try{
            jwt.verify(token,process.env.SECRET_KEY)
            next()
        }catch(err){
            response.send({message:err.message})
        }

    }
    //if token is valid, allow to access protected route
    //else, ask to login again
}

module.exports=tokenverify