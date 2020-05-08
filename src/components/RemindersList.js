import React, { useState } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Loader, Segment, Dimmer, List, Divider, Icon, Checkbox } from 'semantic-ui-react'
import { formatReminder } from '../helper/functions'

const RemindersList = props => {
  const [prioritySort, updatePrioritySort] = useState(false)

  const displayPriorityColor = (r) => {
    switch (r.priority) {
      case 1:
        return 'red'
      case 2:
        return 'yellow'
      case 3:
        return 'blue'
      case 4:
        return 'grey'
      default:
        return 'blue'
    }
  }

  const renderReminders = reminders => {
    if (prioritySort) {
      return [...reminders].sort((a, b) => a.priority - b.priority)
    }
    return reminders
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
        <h4>Today's Reminders:</h4>
        <List>
          {props.todaysReminders.length === 0 ? (
            'No reminders today'
          ) : (
            renderReminders(props.todaysReminders).map((r, key) => (
              <List.Item key={key}>
                <Icon name='bell outline' color={displayPriorityColor(r)} />
                <List.Content>
                  {formatReminder(r, props.contacts)} 
                </List.Content>
              </List.Item>)
            )
          )}
        </List>

        <Divider />

        <h4>This Week's Reminders:</h4>
        <List>
          {props.thisWeeksReminders.length === 0 ? (
            'No upcoming reminders for this week!'
          ) : (
            renderReminders(props.thisWeeksReminders).map((r, key) => (
              <List.Item key={key}>
                <Icon name='bell outline' color={displayPriorityColor(r)} />
                {formatReminder(r, props.contacts)} 
              </List.Item>)
            )
          )}
        </List>

        <Divider />

        <h4>Upcoming Reminders:</h4>
        <List>
          {props.upComingReminders.length === 0 ? (
            'No Upcoming Reminders'
          ) : (
            renderReminders(props.upComingReminders).map((r, key) => (
            <List.Item key={key}>
              <Icon name='bell outline' color={displayPriorityColor(r)} />
              {formatReminder(r, props.contacts)} 
            </List.Item>))
          )}
        </List>
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