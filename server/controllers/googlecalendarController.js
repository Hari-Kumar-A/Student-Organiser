
module.exports.showEvent = async (req, res) => {
    console.log("You called me")
    if(req.session.studentId=='64b957eccdb6ba297a5cbf1e'){
    // const studentId='64b957eccdb6ba297a5cbf1e'
        const events=[]

        events.push({
          summary: req.body.event, 
          start: {
            dateTime: (req.body.startdate).toISOString(),
            timeZone: "Asia/Kolkata",
          },
          end: {
            dateTime: (req.body.enddate).toISOString(),
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
    };



    ;
      
        // showEvent();