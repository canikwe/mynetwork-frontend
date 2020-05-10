import React from 'react'
import { connect } from 'react-redux'
import { deletingContact, deletingReminder } from '../redux/actions'
import { Card, Icon, Image, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import moment from 'moment'

class ContactCard extends React.Component {

  contactReminders = () => {
    return this.props.reminders.filter(r => r.contact_id === this.props.contact.id)
  }

  render() {
    return (
      <React.Fragment>
        <Card as={Link} to={`/friends/${this.props.contact.id}`}>
          <Card.Content>
            <Image floated='right' size='mini' src={this.props.contact.avatar} />
            <Card.Header>{this.props.contact.name}</Card.Header>
            <Card.Meta>
              <span className='date'>Connected {moment(this.props.contact.created_at).fromNow()}</span>
            </Card.Meta>
            <Card.Description>
              <Label size='tiny'>
                {this.props.contact.kind}
              </Label>
            </Card.Description>
          {/* <Menu fluid text vertical className='scrolled'>
            {this.props.reminders.filter(r => r.contact_id === this.props.contact.id).map(r => {
              return (
                <Dropdown key={r.id} text={r.msg} pointing='left' className='link item'>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={(e) => this.handleOpen('editReminderModal', r)
                      }>Edit Reminder { this.editReminder() }</Dropdown.Item>
                    <Dropdown.Item onClick={() => this.handleOpen('deleteReminderModal', r)}>Delete Reminder { this.deleteReminder() }</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )
            })}
          </Menu> */}
          </Card.Content>
          <Card.Content extra>
            <Icon name='bell' />
            {this.contactReminders().length} Reminder(s)
            <br />
            <Icon name='comments outline' />
            {this.props.contact.encounters.length} Meetings(s)
          </Card.Content>
        </Card>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    user_id: state.user.id,
    reminders: state.reminders
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deletingContact: (contact) => dispatch(deletingContact(contact)),
    deletingReminder: (reminder) => dispatch(deletingReminder(reminder))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactCard)