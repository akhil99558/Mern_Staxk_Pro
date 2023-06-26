//create express app
const exp=require("express")
const app=exp()

//assign port num

require('dotenv').config()
const port=process.env.PORT||4000

app.listen(port,()=>console.log("server listening in port 4000..."))

const path=require("path")
//connect express with react build
app.use(exp.static(path.join(__dirname,'./build')))


//get mongo client
const mclient=require('mongodb').MongoClient

//connect to mongoDB server
mclient.connect('mongodb://127.0.0.1:27017')
.then(dbref=>{
    //get db object
    let dbObj=dbref.db('demodb')
    //create collections obj
    let userCollection=dbObj.collection("userCollection")
    let productsCollection=dbObj.collection("productsCollection")

    //share collection objects to APIs
    app.set("userCollection",userCollection)
    app.set("productsCollection",productsCollection)
    
    console.log("connected to db")
})
.catch(err=>console.log("db connection error",err))

//import userApp and productApp
const userApp=require("./API/userApi")
const productApp=require("./API/productAPI")
const { DBRef } = require("mongodb")
const { request } = require("http")

//forward req to UserAPI when url path starts with /user-api
app.use('/user-api',userApp)
//forward req to productAPI when url path starts with /products-api
app.use('/products-api',productApp)


//middlewear to deal with page refresh
const PageRefresh=(request,response,next)=>{
    response.sendFile(path.join(__dirname,'./build/index.html'))
}
app.use("/*",PageRefresh)
//create err handling middleware
//FOR SYNCHRONOUS ERRORS 

const invalidPath=(request,respose,next)=>{
    response.send({message:"invalid path"})
}
app.use(invalidPath)


const errHandler=(error,request,response,next)=>{
    response.send({"error-message":error.message})

}
app.use(errHandler)
//FOR ASYNCHRONOUS WE USE TRY CATCH BLOCK