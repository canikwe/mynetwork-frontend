import React from 'react'
import { connect } from 'react-redux'
import ReminderForm from '../components/ReminderForm';
import ContactForm from './ContactForm'
import { deletingContact, deletingReminder } from '../redux/actions'
import { Dropdown, Menu, Modal, Button } from 'semantic-ui-react'
import '../App.css'



class ContactCard extends React.Component {
  constructor(){
    super()
    this.state = {
      newReminderModalOpen: false,
      editReminderModalOpen: false,
      editContactOpen: false,
      featuredReminder: {}
    }
  }

  handleOpen = (modal, featuredReminder) => this.setState({[modal]: true, featuredReminder})

  handleClose = modal => this.setState({[modal]: false})

  //Methods for Reminder CRUD actions
  createReminderBtn = () => {
    return (
      <Modal
        trigger={<Button
          onClick={() => this.handleOpen('newReminderModalOpen')}
          icon ='calendar plus outline'
          primary 
        />}
        open={this.state.newReminderModalOpen}
        onClose={() => this.handleClose('newReminderModalOpen')}
      >
        <ReminderForm contact={this.props.contact} title={'Create a new reminder!'} handleClose={this.handleClose}/>
      </Modal>
      )
    }

  editReminder = () => {
    // debugger
    console.log(this.state)
    return (
      <Modal
        open={this.state.editReminderModalOpen}
        onClose={() => this.handleClose('editReminderModalOpen')}
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
          onClick={() => this.handleOpen('editContactOpen')}
          icon='edit outline' 
          basic color='grey' />}
        onClose={() => this.handleClose('editContactOpen')} 
      >
        <ContactForm contact={this.props.contact} />
      </Modal>
    )
  }

  deleteContactBtn = () => {
    return <Button 
      onClick={() => this.props.deletingContact(this.props.contact)}
      icon='trash alternate' 
      basic 
      color='grey' 
      />
  }

  render() {
    console.log(this.state)
    return (
      <React.Fragment>
        <div className='card'>
          <div className='header' onClick={this.toggleMenu}>Contact Card For: {this.props.contact.name}</div>
          <Menu fluid text vertical>
            {this.props.reminders.filter(r => r.contact_id === this.props.contact.id).map(r => {
              return (
                <Dropdown key={r.id} text={r.msg} pointing='left' className='link item'>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => this.handleOpen('editReminderModalOpen', r)
                      }>Edit Reminder { this.editReminder() }</Dropdown.Item>
                    <Dropdown.Item onClick={() => this.props.deletingReminder(r)}>Delete Reminder</Dropdown.Item>
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