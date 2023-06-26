const exp=require("express")
const productApp=exp.Router()
//PRODUCT API

const expressAsyncHandler=require('express-async-handler')
//import multerObj
const multerObj=require('./middleware/cloudinaryConfig')

productApp.use(exp.json())
//
productApp.get('/get-products',expressAsyncHandler(async(request,response)=>{
    //response.send({message:"get products"})
    const productCollectionObj=request.app.get("productsCollection")


    //find user by username
    let product=await productCollectionObj.find({}).toArray()


    //send res
    response.status(200).send({message:'product',payload:product})

}))


//FOR PRODUCT REGISTER
productApp.post('/create-products',multerObj.single('photo'),expressAsyncHandler(async(request,response)=>{
    //response.send({message:"create products"})

    const productCollectionObj=request.app.get("productsCollection")

    const newProd=JSON.parse(request.body.user)

    //add CDN link of cloudinary image to user obj
    newProd.image=request.file.path

    //insert product
    await productCollectionObj.insertOne(newProd)
    response.status(201).send({message:"product registered",product:newProd})
}))


//FOR GETTING AND DISPLAYING MORE DETAILS OF PRODUCT
productApp.post('/product-details',expressAsyncHandler(async(request,response)=>{

    //get user collection
    const productCollectionObj=request.app.get("productsCollection")

    //get username from url
    let productObj=request.body

    //verify user is already existed
    let prodOfDb=await productCollectionObj.findOne({prodId:productObj._id})

    response.status(201).send({message:"success",product:prodOfDb})

}))




productApp.put('/update-products',(request,response)=>{
    response.send({message:"update products"})
})


productApp.delete('/delete-products',(request,response)=>{
    response.send({message:"delete products"})
})

//export productAPI

module.exports=productApp


