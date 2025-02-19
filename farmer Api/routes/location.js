const express = require('express')
const router = express.Router()
const locationSchema = require('../Models/Location')
const jwt = require('jsonwebtoken')
require('dotenv').config()
router.post('/address',async(req,res)=>{
    try{
const user = await jwt.verify(req.headers.authorization.split(" ")[1], "jsonkey")
console.log(user);

const addData = await new List({
    country:req.body.country,
    city:req.body.city,
    postcode:req.body.postcode
})
const data = await addData.save()
res.status(200).json({
    data:data
})

    }
    catch(err){
console.log(err);
res.status(500).json({
    error:err
})

    }
})
// 
router.post('/get-location',async(req,res)=>{
    try{
const user = await jwt.verify(req.headers.authorization.split(" ")[1],"jsonkey")
const data = await locationSchema.find()
res.status(200).json({
    data:data
})
    }
    catch(err){
        console.log(err);
        
res.status(500).json({
    error:err
    
})
    }
})
//
router.get('/get/:id',async(req,res)=>{
    try{
const user = await jwt.verify(req.headers.authorization.split(" ")[1],"jsonkey")

const data = await locationSchema.findById({_id:req.params.id})
console.log(data);
res.status(200).json({
    data:data[0]
  })

    }
    catch(err){
        console.log(err);
        res.status(500).json({
            error:err
        })
        
    }
})


module.exports= router