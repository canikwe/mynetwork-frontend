import React from 'react'
import Contact from '../components/Contact'
import { Card } from 'semantic-ui-react'
import { connect } from 'react-redux'

const ContactGroup = props => {
  debugger
  return (
    <>
      <h1> These are your top contacts: </h1>
      <Card.Group centered stackable>
        { props.contacts.map(c => <Contact key={c.id} contact={c} />) }
      </Card.Group>
    </>
  )
}

const mapStateToProps = state => {
  return ({
    contacts: state.contacts
  })
}

ContactGroup.defaultProps = {
  contacts: []
}

export default connect(mapStateToProps)(ContactGroup)
