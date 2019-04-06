import React from 'react'
import { connect } from 'react-redux'
import ContactCard from '../components/ContactCard'

const ContactCardContainer = props => {
  return(
    
    <div>
      <h1> I am a card container </h1>
        {props.contacts.map(c => <ContactCard key={c.id} contact={c} />)}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    contacts: state.contacts
  }
}

export default connect(mapStateToProps)(ContactCardContainer)