const express = require('express')
const router = express.Router()
const Location = require('../Models/Location')
const jwt = require('jsonwebtoken')

router.post("/add-location", async (req, res) => {
  try {
    const user = await jwt.verify(
      req.headers.authorization.split(" ")[1],
      "jsonkey"
    );
    console.log(user);
    
    const data = await new Location({
      country:req.body.country,
      city:req.body.city,
      postcode:req.body.postcode
    });
    const dataUpload = await data.save();
    res.status(200).json({
      dataUpload: dataUpload,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err
    });
  }
});
// 
router.get('/get-location',async(req,res)=>{
    try{
const user = await jwt.verify(req.headers.authorization.split(" ")[1],"jsonkey")
console.log(user);

const data = await Location.find()
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
router.put('/update/:id',async(req,res)=>{
    try{
const user = await jwt.verify(req.headers.authorization.split(" ")[1],"jsonkey")
const data =await Location.find({_id:req.params.id})
const upDate = {
    country:req.params.country,
    city:req.params.city,
    postcode:req.params.postcode
}
const update = await Location.findByIdAndUpdate(req.params.id,upDate,{new:true})
res.status(200).json({
    update:update
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