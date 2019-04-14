import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import { connect } from 'react-redux'
import 'react-big-calendar/lib/css/react-big-calendar.css'


const localizer = BigCalendar.momentLocalizer(moment)


const Calendar = props => {
  if (props.loading) {
    return <h1>Loading...</h1>
  } else {
    return (
      <div className='wrapper calendar'>
        <h1>Calendar</h1>
          <BigCalendar
            localizer={localizer}
            events={props.recurringReminders}
            startAccessor='start'
            endAccessor='start'
            titleAccessor='msg'
            defaultView='month'
            views={['month', 'day', 'week']}
            alldayaccessor='all_day'

          />
      </div>
    )
  }
}



const mapStateToProps = state => {
  return {
    reminders: state.reminders,
    loading: state.loading,
    recurringReminders: state.recurringReminders
  }
}

export default connect(mapStateToProps)(Calendar)