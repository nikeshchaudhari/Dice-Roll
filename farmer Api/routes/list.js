const express = require("express");
const router = express.Router();
const List = require("../Models/List");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();
cloudinary.config({
  cloud_name :process.env.CLOUD,
  api_key :process.env.API_KEY,
  api_secret:process.env.API_SCRET
})
// add listin vegetable
router.post("/add-list", async (req, res) => {
  try {
    const user = await jwt.verify(
      req.headers.authorization.split(" ")[1],
      "jsonkey"
    );
const uploadImage = await cloudinary.uploader.upload(req.files.photo.tempFilePath)
console.log(uploadImage);


    const data = await new List({
      vegetableName: req.body.vegetableName,
      quantity: req.body.quantity,
      price: req.body.price,
      market: req.body.market,
      location: req.body.location,
      uId: user._id,
      imageUrl:uploadImage.secure_url,
      imageId:uploadImage.public_id
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
// get list details
router.get("/all-list", async (req, res) => {
  try {
    // console.log(req.headers.authorization);
    const user = await jwt.verify(
      req.headers.authorization.split(" ")[1],
      "jsonkey"
    );
    console.log(user);
    
    const data = await List.find({uId:user.id})
    res.status(200).json({
      data: data,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
});
//get id
router.get('/listData/:id',async(req,res)=>{
  try{
const user = await jwt.verify(req.headers.authorization.split(" ")[1],"jsonkey")
console.log(user)

const data = await List.findById({_id:req.params.id}).populate('location','city ')
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
// delete list 

router.delete('/delete/:id',async(req,res)=>{
  try{
const user = await jwt.verify(req.headers.authorization.split(" ")[1],"jsonkey")
console.log(user);

const data = await List.find({_id:req.params.id})
console.log(data[0]);
if(data[0].uId != user._id){
  return  res.status(500).json({
 error:"Invalid user...."
})
}
await cloudinary.uploader.destroy(data[0].imageId)
const deleteData = await List.findByIdAndDelete(req.params.id)
res.status(200).json({
  deleteData :"deleteData"
})

  }
  catch(err){
console.log(err);
res.status(200).json({
  error:err
})

  }
})
// list update
router.put('/update/:id',async(req,res)=>{
  
})
module.exports = router;
