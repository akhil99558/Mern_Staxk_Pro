const cloudinary=require('cloudinary').v2
const { request } = require('express');
const multer=require('multer')
const {CloudinaryStorage}=require('multer-storage-cloudinary')
require('dotenv').config() //process.env.PORT ETC
//configure cloudinary
cloudinary.config({ 
    cloud_name:process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret:process.env.API_SECRET
  });

//configure cloudinary storage
let clstorage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:'project_sample',
        public_id:(request,file)=>file.fieldname+'-'+Date.now()

    }
})
//configure multer
let multerObj=multer({storage:clstorage})

//export multerObj
module.exports=multerObj
