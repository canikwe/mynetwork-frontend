import React from 'react'
import { connect } from 'react-redux'
import Feature from '../components/Feature'
import ContactPlaceholder from '../components/ContactPlaceholder'
import { Grid } from 'semantic-ui-react'
import 'toasted-notes/src/styles.css';
import FeaturedContactCardContainer from '../components/FeaturedContactCardContainer'

const Homepage =  props => {
  const thrivingContacts = () => {
    const filterdByEncounter = props.contacts.filter(c => c.encounters.length)
    return filterdByEncounter.sort((a, b) => b.encounters.length - a.encounters.length)
  }

  const wiltingContacts = () => {
    const thrivingContactsCount = thrivingContacts().length
    const averageEncounterNum = thrivingContacts().reduce((acc, curr) => acc + curr.encounters.length, 0) / thrivingContactsCount

    // debugger
    return props.contacts.filter(c => c.encounters <= averageEncounterNum)
  }

  if (props.loading) {
    return <h1>Loading, please wait... </h1>
  } else {
    return (
     <div className='wrapper'>
      <Grid>
        <Grid.Row>
          <Grid.Column >
            <h1>Welome back, {props.user.first_name} !</h1>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            <Feature />
          </Grid.Column>
        </Grid.Row>

        {/* <Grid.Row centered>
          <Grid.Column>
            <Filter />
          </Grid.Column>
        </Grid.Row> */}

        <Grid.Row>
          <Grid.Column>
            {props.contacts.length === 0 ?
            <ContactPlaceholder />
            :
            <>
              <FeaturedContactCardContainer title='Flourishing Friends' description='Thriving from all the love and attentions these days' contacts={thrivingContacts().slice(0, 4)}/>
              <FeaturedContactCardContainer title='Water Me Please' description='We could use some TLC. Why not try reaching out?' contacts={wiltingContacts().slice(0, 4)}/>
            </>
            }
          </Grid.Column>
        </Grid.Row>

      </Grid>

      {/* {props.reminders.map(r => alerts(r))} */}
      {/* {toast.notify('Hello World', {position: 'bottom-left'})} */}

      {/* {props.reminders.filter(r => r.date !== null && new Date(r.date) >= new Date()).map(r => console.log(r.msg, new Date(r.date)))} */}
     </div>
   )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading,
    user: state.user,
    reminders: state.reminders,
    contacts: state.contacts
  }
}

export default connect(mapStateToProps)(Homepage)