const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();
cloudinary.config({
  cloud_name: process.env.CLOUD,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SCRET,
});

// Post Add in User
router.post("/signup", async (req, res) => {
  try {
    // User SignUp
    console.log(req.files.photo);
    const user = await User.find({ email: req.body.email });
    if (user.length > 0) {
      return res.status(500).json({
        error: "Email already register...",
      });
    }
    const hashCode = await bcrypt.hash(req.body.password, 10);
    const uploadPhoto = await cloudinary.uploader.upload(
      req.files.photo.tempFilePath
    );
    console.log(uploadPhoto);

    const data = await new User({
      fullName: req.body.fullName,
      email: req.body.email,
      password: hashCode,
      phone: req.body.phone,
    });
    const addUser = await data.save();
    res.status(200).json({
      fullName: addUser.fullName,
      email: addUser.email,
      phone: addUser.phone,
      _id: addUser._id,
      imageUrl: uploadPhoto.secure_url,
      imageId: uploadPhoto.public_id,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
});
// login Users
router.post("/login", async (req, res) => {
  try {
    const user = await User.find({ email: req.body.email });
    if (user.length == 0) {
      return res.status(500).json({
        error: "email not register...",
      });
    }
    const hashMatch = await bcrypt.compare(req.body.password, user[0].password);
    if (!hashMatch) {
      return res.status(500).json({
        error: "Invalid User...",
      });
    }
    const token = await jwt.sign(
      {
        _id: user[0]._id,
        fullName: user[0].fullName,
        email: user[0].email,
        phone: user[0].phone,
        imageUrl: user[0].imageUrl,
        imageId: user[0].imageId,
      },
      "jsonkey",
      {
        expiresIn: "365d",
      }
    );
    res.status(200).json({
      _id: user[0]._id,
      fullName: user[0].fullName,
      email: user[0].email,
      phone: user[0].phone,
      imageUrl: user[0].imageUrl,
      imageId: user[0].imageId,
      token: token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
});

module.exports = router;
