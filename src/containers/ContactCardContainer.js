import React from 'react'
import { connect } from 'react-redux'
import '../App.css'

const ContactCardContainer = props => {
  return(
    
    <div>
      <h1> I am a card container </h1>
        {/* may need to update with backend refactor */}
        {props.contacts.map(c => {
          return (
            <div className='reminder-card' key={c.id}>
              Contact Card For: {c.name}
              <ul>
                {props.reminders.filter(r => r.contact_id === c.id).map(r => <li key={r.id}>{r.msg}</li>)}
              </ul>
            </div>
          )
        })}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user,
    loading: state.loading,
    reminders: state.reminders,
    contacts: state.contacts
  }
}

export default connect(mapStateToProps)(ContactCardContainer)