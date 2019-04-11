import React from 'react'
import { connect } from 'react-redux'
import ContactCard from '../components/ContactCard'
// import { Grid } from 'semantic-ui-react'

const ContactCardContainer = props => {
  return(
    
    <div>
      <div className='ui cards'>
        {props.contacts.filter(c => c.name.includes(props.searchTerm)).map(c => <ContactCard key={c.id} contact={c} />)}
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