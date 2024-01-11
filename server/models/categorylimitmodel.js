const mongoose=require('mongoose')
    

const categorylimitSchema=  mongoose.Schema({
    
    category:{
        type:String,
        required:true
    },
    categorylimit:{
        type:Number,
        required:true
    } 
    ,
    studentId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'students', required: true
     },
}) 
module.exports=mongoose.model('categorylimits', categorylimitSchema)