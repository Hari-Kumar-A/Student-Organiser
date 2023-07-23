const mongoose=require('mongoose')
    

const eventSchema=  mongoose.Schema({
    event:{
        type:String,
        required:true
    },
    startdate:{
        type:Date,
        // required:true
    },
    enddate:{
        type:Date,
        // required:true
    }
    ,
    studentId: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'students', required: true
     },
}) 
module.exports=mongoose.model('events', eventSchema)