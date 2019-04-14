import React from 'react'
import { connect } from 'react-redux'
import ReminderForm from '../components/ReminderForm';
import ContactForm from './ContactForm'
import { deletingContact, deletingReminder } from '../redux/actions'
import { Dropdown, Menu, Modal, Button, Header } from 'semantic-ui-react'
import '../App.css'



class ContactCard extends React.Component {
  constructor(){
    super()
    this.state = {
      newReminderModal: false,
      editReminderModal: false,
      deleteReminderModal: false,
      editContactModal: false,
      deleteContactModal: false,
      featuredReminder: {}
    }
  }

  handleOpen = (modal, featuredReminder) => this.setState({[modal]: true, featuredReminder})

  handleDelete = () => this.setState({deleteReminderModal: false})

  handleClose = modal => this.setState({[modal]: false})

  //Methods for Reminder CRUD actions
  createReminderBtn = () => {
    return (
      <Modal
        trigger={<Button
          onClick={() => this.handleOpen('newReminderModal')}
          icon ='calendar plus outline'
          primary 
        />}
        open={this.state.newReminderModal}
        onClose={() => this.handleClose('newReminderModal')}
      >
        <ReminderForm contact={this.props.contact} title={'Create a new reminder!'} handleClose={this.handleClose}/>
        <p />
      </Modal>
      )
    }

  editReminder = () => {

    return (
      <Modal
        open={this.state.editReminderModal}
        onClose={() => this.handleClose('editReminderModal')}
      >
        <ReminderForm 
          contact={this.props.contact} 
          title={'Update reminder!'} 
          reminder={this.state.featuredReminder} 
          handleClose={this.handleClose}
        />
      </Modal>
    )
  }

  editContactBtn = () => {
    //edit modal goes here
    return (
      <Modal
        trigger={<Button 
          onClick={() => this.handleOpen('editContactModal')}
          icon='edit outline' 
          basic color='grey'
        />}
        open={this.state.editContactModal}
        onClose={() => this.handleClose('editContactModal')} 
        size='tiny'
      >
        <ContactForm contact={this.props.contact} handleClose={this.handleClose}/>
      </Modal>
    )
  }

  deleteContactBtn = () => {
    return (
      <Modal
      size='mini'
      trigger={<Button 
        onClick={() => this.handleOpen('deleteContactModal')}
        icon='trash alternate' 
        basic 
        color='grey' 
        />}
      open={this.state.deleteContactModal}
      onClose={() => this.handleClose('deleteContactModal')}
      >
      <Header icon='trash' content='Delete this contact?' />
      <Modal.Content>
        <p>This is an irreversible action. Are you sure you want to proceed?</p>
      </Modal.Content>
      <Modal.Actions>
        <Button negative content='No' onClick={() => this.handleClose('deleteContactModal')} />
        <Button positive icon='checkmark' labelPosition='right' content='Yes' onClick={() => {
          this.props.deletingContact(this.props.contact)
          this.handleClose('deleteContactModal')
          }
        } />
      </Modal.Actions>
    </Modal>
    )
  }

  deleteReminder = () => {
    return (
      <Modal
      size='mini'
      open={this.state.deleteReminderModal}
      onClose={() => this.handleClose('deleteReminderModal')}
      >
        <Header icon='trash' content='Delete this reminder?'/>
        <Modal.Content>
          <p>This is an irreversible action. Are you sure you want to proceed?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative content='No' onClick={() => this.handleClose('deleteReminderModal')} />
          <Button positive icon='checkmark' labelPosition='right' content='Yes' onClick={() => {
            this.props.deletingReminder(this.state.featuredReminder)
            this.handleClose('deleteReminderModal')
            }
          }/>
        </Modal.Actions>
    </Modal>
    )
  }

  render() {
    return (
      <React.Fragment>
        <div className='ui raised fluid card'>
          <div className='header' onClick={this.toggleMenu}>Contact Card For: {this.props.contact.name}</div>
          <Menu fluid text vertical className='scrolled'>
            {this.props.reminders.filter(r => r.contact_id === this.props.contact.id).map(r => {
              return (
                <Dropdown key={r.id} text={r.msg} pointing='left' className='link item'>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => this.handleOpen('editReminderModal', r)
                      }>Edit Reminder { this.editReminder() }</Dropdown.Item>
                    <Dropdown.Item onClick={() => this.handleOpen('deleteReminderModal', r)}>Delete Reminder { this.deleteReminder() }</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )
            })}
          </Menu>

          <div className='extra content'>
            {this.createReminderBtn()}
            {this.editContactBtn()}
            {this.deleteContactBtn()}
          </div>
        </div>
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