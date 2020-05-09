import React, { useState } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Loader, Segment, Dimmer, Divider, Checkbox } from 'semantic-ui-react'
import RemindersSubList from './RemindersSubList'

const RemindersList = props => {
  const [prioritySort, updatePrioritySort] = useState(false)

  const renderReminders = reminders => {
    if (prioritySort) {
      return [...reminders].sort((a, b) => a.priority - b.priority || a.start - b.start)
    }
    return [...reminders].sort((a, b) => a.start - b.start)
  }

  if (!props.todaysReminders) {
    return (
      <Segment>
        <Dimmer active inverted>
          <Loader>Loading</Loader>
        </Dimmer>
      </Segment>
    )
  } else {
    return (
      <>
        <div className='reminders'>
          <RemindersSubList reminders={renderReminders(props.todaysReminders)} contacts={props.contacts} title="Today's Reminders:" />

          <Divider />
            <RemindersSubList reminders={renderReminders(props.thisWeeksReminders)} contacts={props.contacts} title="This Week's Reminders:" />

          <Divider />

          <RemindersSubList reminders={renderReminders(props.upComingReminders)} contacts={props.contacts} title="Upcoming Reminders:" />

        </div>
        <Checkbox
          slider
          label='Sort By Priority'
          checked={prioritySort}
          onChange={() => updatePrioritySort(!prioritySort)}
        />
      </>
    )
  }
}

const mapStateToProps = state => {
  const todaysReminders = []
  const thisWeeksReminders = []
  const upComingReminders = []
  const today = moment()
  const monthFromToday = moment(new Date()).add(1, 'months')

  state.recurringReminders.forEach(r => {
    const reminderDate = moment(r.start, 'YYYYMMDD')
    // console.log(reminderDate)
    if (today.isSame(reminderDate, 'day')) {
      // console.log(r)
      todaysReminders.push(r)
    } else if (reminderDate.isAfter(today, 'day') && today.isSame(reminderDate, 'week')) {
      thisWeeksReminders.push(r)
    } else if (reminderDate.isAfter(today, 'week') && reminderDate.isBefore(monthFromToday)) {
      upComingReminders.push(r)
    }
  })

  return ({ todaysReminders, thisWeeksReminders, upComingReminders, contacts: state.contacts })
}

export default connect(mapStateToProps)(RemindersList)