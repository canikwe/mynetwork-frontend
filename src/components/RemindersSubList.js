import React from 'react'
import moment from 'moment'
import { List, Button } from 'semantic-ui-react'
import { formatReminderToast } from '../helper/functions'

const RemindersSubList = ({ reminders, contacts, title }) => {
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
          'No reminders today'
        ) : (
            reminders.map((r, key) => (
              <List.Item key={key}>
                {
                  title.includes('Today') ?
                    <List.Content floated='right'>
                      <Button>Snooze</Button>
                    </List.Content> 
                    : null
                }
                <List.Icon name='bell outline' color={displayPriorityColor(r)} />
                <List.Content>
                  <List.Header as='a'>{formatReminderToast(r, contacts)} </List.Header>
                  <List.Description as='a'>{moment(r.start).format('MMMM Do, YYYY')}</List.Description>
                </List.Content>
              </List.Item>)
            )
          )}
      </List>
    </>
  )
}

export default RemindersSubList