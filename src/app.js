const express = require('express');
const app = express();
const multer = require('multer');

require('./db/conn');
const Images = require("./models/images");
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const Storage = multer.diskStorage({
    destination:"uploads",
    filename: (req,file,cb)=>{
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)+'.jpg';
        cb(null,file.fieldname + '-' + uniqueSuffix);
    },
});

const upload = multer({
    storage: Storage
}).single('testImage')

app.get("/",(req,res)=>{
    res.send("upload file");
});

app.post("/upload",(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err);
        }
        else{
            const newImage=new Images({
                name:req.body.name,
                image:{
                    data:req.file.filename,
                    contentType:'image/jpg'
                }
            })
            newImage.save()
            .then(()=> res.send('successfully uploaded')).catch(err=>console.log(err));
        }
    });
});

app.listen(port, function() {   
    console.log("listening on port " + port); 
});