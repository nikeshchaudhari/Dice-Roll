const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const listRoute= require('./routes/list')
const userRoute = require('./routes/user')
const dbConnect = async()=>{
require('dotenv').config()
try{
await mongoose.connect(process.env.MONGO_URL);
console.log("Database Connected....");

}
catch(err){
console.log("Something Wrong...");
console.log(err);


}
}
dbConnect()

app.use(bodyParser.json())
app.use('/list',listRoute);
app.use('/auth',userRoute)
module.exports =app;