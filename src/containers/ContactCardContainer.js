import React from 'react'
import { connect } from 'react-redux'
import '../App.css'

const ContactCardContainer = props => {
  return(
    
    <div>
      <h1> I am a card container </h1>
        {/* may need to update with backend refactor */}
        {props.user.contacts.map(c => {
          return (
            <div className='reminder-box' key={c.id}>
              Contact Card For: {c.name}
              <ul>
                {c.reminders.map(r => <li key={r.id}>{r.msg}</li>)}
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
    loading: state.loading
  }
}

export default connect(mapStateToProps)(ContactCardContainer)