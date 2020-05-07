import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Loader, Segment, Dimmer, List, Divider } from 'semantic-ui-react'
import { formatReminder } from '../helper/functions'

const RemindersList = props => {

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
      <div className='reminders'>
        <h4>Today's Reminders:</h4>
        <List bulleted>
          {props.todaysReminders.length === 0 ? (
            'No reminders today'
          ) : (
            props.todaysReminders.map((r, key) => (
              <List.Item key={key}>
                {formatReminder(r, props.contacts)} 
              </List.Item>)
            )
          )}
        </List>

        <Divider />

        <h4>This Week's Reminders:</h4>
        <List bulleted>
          {props.thisWeeksReminders.length === 0 ? (
            'No upcoming reminders for this week!'
          ) : (
            props.thisWeeksReminders.map((r, key) => (
              <List.Item key={key}>
                {formatReminder(r, props.contacts)} 
              </List.Item>)
            )
          )}
        </List>

        <Divider />

        <h4>Upcoming Reminders:</h4>
        <List bulleted>
          {props.upComingReminders.length === 0 ? (
            'No Upcoming Reminders'
          ) : (
            props.upComingReminders.map((r, key) => (
            <List.Item key={key}>
              {formatReminder(r, props.contacts)} 
            </List.Item>))
          )}
        </List>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const todaysReminders = []
  const thisWeeksReminders = []
  const upComingReminders = []
  const today = moment(new Date(), 'YYYYMMDD')
  const monthFromToday = moment(new Date()).add(1, 'months')

  state.recurringReminders.forEach(r => {
    const reminderDate = moment(r.start, 'YYYYMMDD')

    if (today.isSame(reminderDate, 'day')) {
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