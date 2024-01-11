const mongoose=require('mongoose')
    

const expenseSchema=  mongoose.Schema({
    expense:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        required:true
    }
    ,
    studentId: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'students', required: true
     },
    categoryId: { // Reference field to link expenses with category limits
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categorylimit',
      }
}) 
module.exports=mongoose.model('expenses', expenseSchema)