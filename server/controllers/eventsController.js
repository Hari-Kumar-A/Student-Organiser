const eventsmodel=require('../models/eventsmodel')
const assignmentmodel=require('../models/assignmentmodel')
const mongoose=require('mongoose')

// ----------------------------------------------------------------------------------
const { google } = require("googleapis");
const ObjectId = require('mongoose').Types.ObjectId;
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env') });


// ------------------------------------------------------------------------------------------------

 
//rendering addevent page
module.exports.addEvent=async (req, res)=>{
    res.render('addevent')
}   


                   //adding event by post + going to googlecalendar
module.exports.postEvent=async (req, res)=>{
    console.log(req.body.startdate + "Hehe")
  
    const data={
        event:req.body.event,
        startdate:req.body.startdate,
        enddate:req.body.enddate,
        studentId:req.session.studentId
    }
    const newEvent=new eventsmodel(data)
    await newEvent.save()


                const GOOGLE_PRIVATE_KEY = process.env.private_key;
                const GOOGLE_CLIENT_EMAIL = process.env.client_email;
                const GOOGLE_PROJECT_NUMBER = process.env.project_number;
                const GOOGLE_CALENDAR_ID = process.env.calendar_id;
                const SCOPES = ["https://www.googleapis.com/auth/calendar"];
                const jwtClient = new google.auth.JWT(
                GOOGLE_CLIENT_EMAIL,
                null,
                GOOGLE_PRIVATE_KEY,
                SCOPES
                );
                const calendar = google.calendar({
                version: "v3",
                project: GOOGLE_PROJECT_NUMBER,
                auth: jwtClient,
                });
                const auth = new google.auth.GoogleAuth({
                keyFile: "./keys.json",
                scopes: SCOPES,
                });

    if(req.session.studentId=='64b957eccdb6ba297a5cbf1e'){
        
            const events=[]
            events.push({
              summary: req.body.event, 
              start: {
                dateTime: (req.body.startdate)+":00.000Z" ,
                timeZone: "Asia/Kolkata",
              },
              end: {
                dateTime: (req.body.enddate)+":00.000Z"  ,
                timeZone: "Asia/Kolkata",
              }
            })
            const addCalendarEvent = async (events) => {
                try {
                  for (const event of events) {
                    const response = await calendar.events.insert({
                      auth: auth,
                      calendarId: GOOGLE_CALENDAR_ID,
                      resource: event,
                    });
              
                    console.log("Event created successfully.");
                    console.log("Event details: ", response.data); 
                  }
                } catch (error) {
                  console.error(error);
                }
              }
            await addCalendarEvent(events)
          }











    res.redirect('/events') 
}  

//viewing all events
module.exports.eventspage=async (req, res)=>{
    const eventsdata=await eventsmodel.find({studentId:req.session.studentId}) 
    // console.log(eventsdata)
    res.render('events',{eventsdata})
}

//viewing an event
module.exports.viewpage=async (req, res)=>{
    const eventdata=await eventsmodel.findOne({ _id: req.params.id })
    res.render('viewevent',{eventdata})
}

//editing an event
module.exports.editpage=async (req, res)=>{
    const eventdata=await eventsmodel.findOne({ _id: req.params.id })
    res.render('editevent',{eventdata})
}

module.exports.posteditpage=async (req, res)=>{
    const editedevent=await eventsmodel.findByIdAndUpdate(req.params.id,{ 
        event:req.body.event,
        startdate:req.body.startdate,
        enddate:req.body.enddate
     })
     await editedevent.save()
     res.redirect('/events')
}

//deleting an event
module.exports.deletepage=async (req, res)=>{
    const eventdata=await eventsmodel.findOne({ _id: req.params.id })
    res.render('deleteevent',{eventdata})
}
module.exports.postdeletepage=async (req, res)=>{
    await eventsmodel.deleteOne({ _id: req.params.id}) 
     res.redirect('/events')
}

//calendar view of events
module.exports.calendarpage=async (req, res)=>{
    const eventsdata=await eventsmodel.find({studentId:req.session.studentId})
    const events=[]
    eventsdata.forEach(element => {
        events.push({
          title: element.event,
          url: `/events/view/${element._id}`,
        //   start: element.duedate.toISOString().split('T')[0]
        start:element.startdate,
        end:element.enddate
        });
      });
    //   console.log(events)
    // const data="Inspection"
    res.render('calendarevent',{layout:false,eventsJSON: JSON.stringify(events)})
}


//search
module.exports.searchpage=async (req, res)=>{
    const searchevent=req.body.searchevent
 
 
    const searcheventdata=await eventsmodel.find({
     studentId:req.session.studentId,
     $or:[
         {event:{ $regex: new RegExp(searchevent,"i")}}
     ]
    }) 
    res.render('searchevent',{searcheventdata})
 }


 //commoncalendar
 module.exports.commoncalendarpage=async (req, res)=>{
    const events=[]
    
    //fetching assignments and dudedate to events array to put in calendar
    const assignmentsdata=await assignmentmodel.find({studentId:req.session.studentId})
    assignmentsdata.forEach(element => {
        events.push({
          title: element.assignment,
          url: `/assignments/view/${element._id}`,
          start: element.duedate.toISOString().split('T')[0]
        })
      })

    //fetching events and start+end date to events array to put in calendar
    const eventsdata=await eventsmodel.find({studentId:req.session.studentId})
    eventsdata.forEach(element => {
        events.push({
          title: element.event,
          url: `/events/view/${element._id}`,
        //   start: element.duedate.toISOString().split('T')[0]
        start:element.startdate,
        end:element.enddate
        })
      })
    //   console.log(events)
    // const data="Inspection"
    res.render('commoncalendar',{layout:false,eventsJSON: JSON.stringify(events)})
}













