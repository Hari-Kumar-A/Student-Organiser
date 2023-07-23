const mongoose=require('mongoose')
    

const assignmentSchema=  mongoose.Schema({
    course:{
        type:String,
        required:true
    },
    assignment:{
        type:String,
        required:true
    },
    duedate:{
        type:Date,
        required:true
    }
    ,
    studentId: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'students', required: true
     },
}) 
module.exports=mongoose.model('assignments', assignmentSchema)