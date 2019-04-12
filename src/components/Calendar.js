import React from 'react'
// import { Card, Grid } from 'semantic-ui-react'
// import { range } from 'lodash' 
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import recur from 'moment-recur'
import { connect } from 'react-redux'
import 'react-big-calendar/lib/css/react-big-calendar.css'


const localizer = BigCalendar.momentLocalizer(moment)

const rec = []


// const calendar = (date) => {
  
//   const year = date.getFullYear()
//   const month = date.getMonth()
//   const days = new Date(year, month, 0).getDate()

//   return days
// }

// const displayCal = () => {
//   return <Grid columns={7}>

//     {range(calendar(new Date())).map(date => <Card key={date} content='hello'/>)}
//   </Grid>
// }

// const events = [{
//   start: new Date(),
//   end: new Date(),
//   title: "hellooo",
//   allDay: true
// }]

const getRecurringEvents = (reminder) => {
  // console.log(moment())
  // debugger
  // debugger
  let recurrence = {}
  const end = moment('2019-4-30', "YYYY MM DD")
  let start = moment(reminder.start_date, "YYYY MM DD")

  // console.log(recurrence.next(3))
  
  // let rec = []
  
  
  switch(reminder.period){
    case 'daily':
      recurrence = start.recur(end).every(reminder.interval).day()
      
      // start.add(reminder.interval, 'days')
      recurrence.next(3).map(r => rec.push({...reminder, start: r._d}))

      console.log(recurrence)
      break
    case 'weekly':
      recurrence = start.recur(end).every(reminder.interval).weeks()
      
      // start.add(reminder.interval, 'weeks')
      recurrence.next(3).map(r => rec.push({...reminder, start: r._d}))
      console.log(recurrence)
      break
    case 'yearly':
      recurrence = start.recur(end).every(reminder.interval).years()
      
      // start.add(reminder.interval, 'weeks')
      recurrence.next(3).map(r => rec.push({...reminder, start: r._d}))
      console.log(recurrence)
      break
    default: 
      // start._d = end._d
      console.log(reminder) 
      break
    }

}

const Calendar = props => {
  if (props.loading) {
    return <h1>Loading...</h1>
  } else {
    return (
    <div className='wrapper calendar'>
      <h1>Calendar</h1>
        <BigCalendar
          localizer={localizer}
          events={rec}
          startAccessor='start'
          endAccessor='start'
          titleAccessor='msg'
          defaultView='month'
          views={['month', 'day', 'week']}

        />
        {props.reminders.forEach(r => getRecurringEvents(r))}
    </div>
  )

  }

}



const mapStateToProps = state => {
  return {
    reminders: state.reminders,
    loading: state.loading
  }
}

export default connect(mapStateToProps)(Calendar)