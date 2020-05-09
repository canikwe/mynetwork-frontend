import React, { useState } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Loader, Segment, Dimmer, Divider, Checkbox } from 'semantic-ui-react'
import RemindersSubList from './RemindersSubList'
import { updatingReminder, creatingEncounter } from '../redux/actions'
import ReminderSnooze from './ReminderSnooze'


const RemindersList = props => {
  const [prioritySort, updatePrioritySort] = useState(false)
  const { featuredReminder } = props

  const renderReminders = reminders => {
    if (prioritySort) {
      return [...reminders].sort((a, b) => Number(a.snoozed) - Number(b.snoozed) || a.priority - b.priority || a.start - b.start)
    }
    return [...reminders].sort((a, b) => Number(a.snoozed) - Number(b.snoozed) || a.start - b.start)
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
      <div className='reminders-container'>
        <div className='reminders'>
          <RemindersSubList reminders={renderReminders(props.todaysReminders)} contacts={props.contacts} title="Today's Reminders:" />

          <Divider />
          {
            props.thisWeeksReminders.length ?
              <RemindersSubList reminders={renderReminders(props.thisWeeksReminders)} contacts={props.contacts} title="This Week's Reminders:" />
              :
              <RemindersSubList reminders={renderReminders(props.nextWeeksReminders)} contacts={props.contacts} title="Next Week's Reminders:" />
          }

          <Divider />

          <RemindersSubList reminders={renderReminders(props.upComingReminders)} contacts={props.contacts} title="Upcoming Reminders:" />

        </div>

        {
          !!featuredReminder.id ? <ReminderSnooze /> : null
        }
        <Checkbox
          slider
          label='Sort By Priority'
          checked={prioritySort}
          onChange={() => updatePrioritySort(!prioritySort)}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  const todaysReminders = []
  const thisWeeksReminders = []
  const nextWeeksReminders = []
  const upComingReminders = []
  const today = moment()
  const weekFromToday = moment(new Date()).add(1, 'weeks')
  const monthFromToday = moment(new Date()).add(1, 'months')

  state.recurringReminders.forEach(r => {
    const reminderDate = moment(r.start, 'YYYYMMDD')
    // console.log(reminderDate)
    if (today.isSame(reminderDate, 'day')) {
      // console.log(r)
      todaysReminders.push(r)
    } else if (reminderDate.isAfter(today, 'day') && today.isSame(reminderDate, 'week')) {
      thisWeeksReminders.push(r)
    } else if (reminderDate.isAfter(today, 'week') && reminderDate.isSame(weekFromToday, 'week')) {
      nextWeeksReminders.push(r)
    } else if (reminderDate.isAfter(today, 'week') && reminderDate.isBefore(monthFromToday)) {
      upComingReminders.push(r)
    }
  })

  return ({ todaysReminders, thisWeeksReminders, nextWeeksReminders, upComingReminders, contacts: state.contacts, featuredReminder: state.featuredReminder })
}

const mapDispatchToProps = dispatch => {
  return {
    updatingReminder: reminder => dispatch(updatingReminder(reminder)),
    creatingEncounter: encounter => dispatch(creatingEncounter(encounter)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RemindersList)