const mongoose=require('mongoose')
    

const courseSchema=  mongoose.Schema({
    
    course:{
        type:String,
        required:true
    },
    credit:{
        type:Number,
        required:true
    } ,
    grade:{
        type:String,
        

    }
    ,
    studentId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'students', required: true
     },
}) 
module.exports=mongoose.model('courses', courseSchema)