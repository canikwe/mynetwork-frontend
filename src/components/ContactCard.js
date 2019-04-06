import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ReminderForm from '../components/ReminderForm';
import '../App.css'



class ContactCard extends React.Component {
  constructor(){
    super()
    this.state = {
      toggleMenu: false,
      createReminderToggle: false,
      updateReminderToggle: false,
      featuredReminder: {}
    }
  }

  toggleMenu = () => {
    this.setState({toggleMenu: !this.state.toggleMenu})
  }

  toggleNewReminderForm = () => {
    this.setState({createReminderToggle: !this.state.createReminderToggle, featuredReminder: {}, updateReminderToggle: false})
      console.log(this.state)

  }

  toggleUpdateReminderForm = (reminder) => {
    console.log(reminder)
    this.setState({
      updateReminderToggle: !this.state.updateReminderToggle, 
      featuredReminder: {...reminder}, 
      createReminderToggle: false})
    console.log(this.state)
  }
  

  displayMenu() {
    return (
      <div>
        <button className='menuLink' onClick={this.toggleNewReminderForm}> Create Reminder</button><br />
        <Link to='/reminders/new'> View Reminders</Link><br />
        <Link to='/reminders/new'> Edit Contact</Link><br />
        <Link to='/reminders/new'> Archive Contact</Link>
      </div>

    )
  }

  

  render() {
    return (
      <React.Fragment>
        <div className='reminder-card'>
          <p onClick={this.toggleMenu}>Contact Card For: {this.props.contact.name}</p>
          <ul>
            {this.props.reminders.filter(r => r.contact_id === this.props.contact.id).map(r => <li key={r.id} onClick={() => this.toggleUpdateReminderForm(r)}>{r.msg}</li>)}
            {this.state.toggleMenu ? this.displayMenu() : null}
          </ul>
        </div>
        <div>
          {this.state.createReminderToggle ? 
          <ReminderForm contact={this.props.contact} title={'Create a new reminder!'}/> : null}
          {this.state.updateReminderToggle ? 
          <ReminderForm contact={this.props.contact} title={'Update reminder!'} reminder={this.state.featuredReminder}/> : null}
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

export default connect(mapStateToProps)(ContactCard)