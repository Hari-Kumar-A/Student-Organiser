const mongoose=require('mongoose')
    

const blogSchema=  new mongoose.Schema({
    title:{
        type:String,
        required:true
    }, 
    content:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default: Date.now
    },
    author:{
        type:String,
        required:true
    },
    studentId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'students',
        required: true
     },
}) 
module.exports=mongoose.model('blogs', blogSchema)