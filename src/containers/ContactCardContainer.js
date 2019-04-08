import React from 'react'
import { connect } from 'react-redux'
import ContactCard from '../components/ContactCard'
// import { Grid } from 'semantic-ui-react'

const ContactCardContainer = props => {
  return(
    
    <div>
      <h1> I am a card container </h1>
        {/* <Grid stackable columns={4}>
          <Grid.Row> */}
          <div className='ui cards'>
            {props.contacts.map(c => <ContactCard key={c.id} contact={c} />)}
          </div>
          {/* </Grid.Row>
        </Grid> */}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    contacts: state.contacts
  }
}

export default connect(mapStateToProps)(ContactCardContainer)