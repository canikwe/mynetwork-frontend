import React from 'react'
import { connect } from 'react-redux'
import ContactCard from '../components/ContactCard'
// import { Grid } from 'semantic-ui-react'

const ContactCardContainer = props => {
  return(
    
    <div>
      <div className='ui four stackable cards'>
        {props.contacts.filter(c => c.name.toLowerCase().includes(props.searchTerm.toLowerCase())).map(c => <ContactCard key={c.id} contact={c} />)}
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    contacts: state.contacts,
    searchTerm: state.searchTerm
  }
}

export default connect(mapStateToProps)(ContactCardContainer)