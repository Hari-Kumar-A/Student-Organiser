require('dotenv').config()
const express=require('express')
const { google } = require("googleapis");
const ejs=require('ejs')
const expressLayout=require('express-ejs-layouts')
const bcrypt=require('bcrypt')
const methodOverride=require('method-override')
const connectDB=require('./server/config/database')
const session =require('express-session')
const authMiddleware = require('./server/middleware/middleware');
const ObjectId = require('mongoose').Types.ObjectId;



//checking node_modules
const fs = require('fs');

const filePath = './node_modules/@fullcalendar/core/main.esm.min.js';

fs.access(filePath, fs.constants.F_OK, (err) => {
  if (err) {
    console.log('main.js does not exist in node_modules.');
  } else {
    console.log('main.js exists in node_modules.');
  }
});



const app=express()
const PORT=5000||process.env.PORT

//connect to student database
connectDB() 


//session setup
app.use(
    session({
      secret: process.env.SECRET_KEY, // Replace with your own secret key for session encryption
      resave: false,
      saveUninitialized: false,
    })
  )
//to fetch forms data to mongodb 
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(methodOverride('_method'))

//to add image, css part
app.use(express.static('public'))

app.use(expressLayout)

app.set('layout','./layouts/layout')
app.set('view engine','ejs')

 
//clearance of cache to prevent user to access using browsesr cache back button
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache', 'no-store', 'must-revalidate');
    next();
  });

  //high security to login 
  const preventCaching = (req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
  };

app.use(preventCaching)
//Routes
app.use('/login',require('./server/routes/login.js'))
app.use('/register',require('./server/routes/register.js'))
 
app.get('/logout', authMiddleware.isAuthenticated, (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.log("Error destroying session:", err);
      }
      res.redirect('/login'); // Will always fire after the session is destroyed
    });
  });
  



app.use('/', authMiddleware.isAuthenticated,require('./server/routes/student.js'))
 


app.get('*',(req, res)=>{
    res.status(404).render('404')
})
app.listen(PORT)


//SENDING EVENTS TO GOOGLE CALENDAR.....



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

// `${element.startdate}`

const eventsmodel=require('./server/models/eventsmodel')

const handleEvents = async (req, res) => {
    const studentId='64b957eccdb6ba297a5cbf1e'
    const eventsdata=await eventsmodel.find({studentId:new ObjectId(studentId)} ) 
    const events=[]
    eventsdata.forEach(element => {
        events.push({
          summary: element.event, 
        start: {
            dateTime: (element.startdate).toISOString(),
            timeZone: "Asia/Kolkata",
          },
          end: {
            dateTime: (element.enddate).toISOString(),
            timeZone: "Asia/Kolkata",
          }
        });
      });
      await addCalendarEvent(events);
    };

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
      };
      
        // handleEvents();
     
      
