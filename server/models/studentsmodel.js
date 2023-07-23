const mongoose=require('mongoose')
    

const registerSchema=  mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
}) 
module.exports=mongoose.model('students', registerSchema)