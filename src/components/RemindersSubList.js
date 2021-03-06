import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { List, Button } from 'semantic-ui-react'
import { formatReminderToast } from '../helper/functions'
import { setFeaturedReminder } from '../redux/actions'


const RemindersSubList = ({ reminders, contacts, title, setFeaturedReminder }) => {
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

  return (
    <>
      <h4>{title}</h4>
      <List>
        {reminders.length === 0 ? (
          'None'
        ) : (
            reminders.map((r, key) => (
              <List.Item key={key} disabled={r.snoozed ? true : false}>
                {
                  !r.snoozed && title.includes('Today') ?
                    <List.Content floated='right'>
                      <Button onClick={() => setFeaturedReminder(r)} primary>Snooze</Button>
                    </List.Content> 
                    : null
                }
                <List.Icon name={r.snoozed && title.includes('Today') ? 'bell slash outline' : 'bell outline'} color={displayPriorityColor(r)} />
                <List.Content>
                  <List.Header>{formatReminderToast(r, contacts)} </List.Header>
                  <List.Description as='a'>{moment(r.start).format('MMMM Do, YYYY')}</List.Description>
                </List.Content>
              </List.Item>)
            )
          )}
      </List>
    </>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    setFeaturedReminder: reminder => dispatch(setFeaturedReminder(reminder))
  }
}

export default connect(null, mapDispatchToProps)(RemindersSubList)