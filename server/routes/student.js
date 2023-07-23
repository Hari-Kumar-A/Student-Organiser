const express=require('express')
const router=express.Router()
const authMiddleware = require('../middleware/middleware');
const studentController=require('../controllers/studentController')
const assignmentsController=require('../controllers/assignmentsController')
const eventsController=require('../controllers/eventsController')
const googlecalendarController=require('../controllers/googlecalendarController')
 
router.get('/',authMiddleware.isAuthenticated, studentController.homepage)

//adding new assignment
router.get('/assignments/assignment',authMiddleware.isAuthenticated, studentController.addAssignment)
router.post('/assignments/assignment',authMiddleware.isAuthenticated, studentController.postAssignment)

//showing all assignments
router.get('/assignments',authMiddleware.isAuthenticated, assignmentsController.assignmentspage)

//view assignment
router.get('/assignments/view/:id',authMiddleware.isAuthenticated, assignmentsController.viewpage)

//edit assignments
router.get('/assignments/edit/:id',authMiddleware.isAuthenticated, assignmentsController.editpage)
router.put('/assignments/edit/:id',authMiddleware.isAuthenticated, assignmentsController.posteditpage)

//delete assignments
router.get('/assignments/delete/:id',authMiddleware.isAuthenticated, assignmentsController.deletepage)
router.delete('/assignments/delete/:id',authMiddleware.isAuthenticated, assignmentsController.postdeletepage)

//search assignments
router.post('/assignments/search',authMiddleware.isAuthenticated, assignmentsController.searchpage)

//calendar view of assignments
router.get('/assignments/calendarassignment',authMiddleware.isAuthenticated, assignmentsController.calendarpage)

//showing all events and classes
router.get('/events',authMiddleware.isAuthenticated, eventsController.eventspage)

//adding events and classes
router.get('/events/addevent',authMiddleware.isAuthenticated, eventsController.addEvent)
router.post('/events/addevent',authMiddleware.isAuthenticated, eventsController.postEvent)

//adding event to googlecalendar*****
// router.post('/events/addevent',authMiddleware.isAuthenticated, googlecalendarController.showEvent)

////view event
router.get('/events/view/:id',authMiddleware.isAuthenticated, eventsController.viewpage)

//edit event
router.get('/events/edit/:id',authMiddleware.isAuthenticated, eventsController.editpage)
router.put('/events/edit/:id',authMiddleware.isAuthenticated, eventsController.posteditpage)

//Delete event
router.get('/events/delete/:id',authMiddleware.isAuthenticated, eventsController.deletepage)
router.delete('/events/delete/:id',authMiddleware.isAuthenticated, eventsController.postdeletepage)

//calendar view of events
router.get('/events/calendarevent',authMiddleware.isAuthenticated, eventsController.calendarpage)

//search events
router.post('/events/search',authMiddleware.isAuthenticated, eventsController.searchpage)

//showing common calendar (Events+Assignments)
router.get('/commoncalendar',authMiddleware.isAuthenticated, eventsController.commoncalendarpage)

module.exports=router
