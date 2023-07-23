const assignmentmodel=require('../models/assignmentmodel')
const mongoose=require('mongoose')

//viewing all assignments
module.exports.assignmentspage=async (req, res)=>{
    const assignmentsdata=await assignmentmodel.find({studentId:req.session.studentId}) 
    console.log(assignmentsdata)
    res.render('assignments',{assignmentsdata})
}

//viewing assignment
module.exports.viewpage=async (req, res)=>{
    const assignmentdata=await assignmentmodel.findOne({ _id: req.params.id })
    res.render('viewassignment',{assignmentdata})
}

//editing assignments
module.exports.editpage=async (req, res)=>{
    const assignmentdata=await assignmentmodel.findOne({ _id: req.params.id })
    res.render('editassignment',{assignmentdata})
}

module.exports.posteditpage=async (req, res)=>{
    const editedassignment=await assignmentmodel.findByIdAndUpdate(req.params.id,{ 
        course:req.body.course,
        assignment:req.body.assignment,
        duedate:req.body.duedate
     })
     await editedassignment.save()
     res.redirect('/assignments')
}

//delete assignment
module.exports.deletepage=async (req, res)=>{
    const assignmentdata=await assignmentmodel.findOne({ _id: req.params.id })
    res.render('deleteassignment',{assignmentdata})
}
module.exports.postdeletepage=async (req, res)=>{
    await assignmentmodel.deleteOne({ _id: req.params.id}) 
     res.redirect('/assignments')
}

//search
module.exports.searchpage=async (req, res)=>{
   const searchassignment=req.body.searchassignment
//    const regexserachassignment=searchassignment.replace(/[^a-zA-Z0-9]/g,"");

   const searchassignmentdata=await assignmentmodel.find({
    studentId:req.session.studentId,
    $or:[
        {course:{ $regex: new RegExp(searchassignment,"i")}},
        {assignment:{ $regex: new RegExp(searchassignment,"i")}}
    ]
   }) 
   res.render('searchassignment',{searchassignmentdata})
}

//calendar view of assignments directing
module.exports.calendarpage=async (req, res)=>{
    const assignmentsdata=await assignmentmodel.find({studentId:req.session.studentId})
    const events=[]
    assignmentsdata.forEach(element => {
        events.push({
          title: element.assignment,
          url: `/assignments/view/${element._id}`,
          start: element.duedate.toISOString().split('T')[0]
        });
      });
    //   console.log(events)
    // const data="Inspection"
    res.render('calendarassignment',{layout:false,eventsJSON: JSON.stringify(events)})
}
