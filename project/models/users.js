const mongoose = require('mongoose')


const UsersSchema=new mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    id:Number
})


module.exports=mongoose.model('users',UsersSchema)