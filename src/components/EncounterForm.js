import React, { useState } from 'react'
import { connect } from 'react-redux'
import { creatingEncounter, setFeaturedReminder } from '../redux/actions'
import { Modal, Button, Form, Input, TextArea, Rating } from 'semantic-ui-react'
import moment from 'moment'


const EncounterForm = ({ open, handleOpen, contact, handleSnooze, featuredReminder, setFeaturedReminder, creatingEncounter }) => {
  const [encounter, updateEncounter] = useState({ verb: featuredReminder ? featuredReminder.msg : '', details: '', rating: 3, date: moment().format('YYYY-MM-DD') })

  const handleAddEncounter = (e) => {
    if (handleSnooze) {
      handleSnooze(e)
    } else {
      setFeaturedReminder({})
    }
    const encounterObj = {...encounter}
    if (featuredReminder) {
      encounterObj.reminder_id = featuredReminder.id
    }
    creatingEncounter({ ...encounterObj, contact_id: contact.id })
  }

  const handleEncounterChange = (e, { name, value }) => {
    updateEncounter({ ...encounter, [name]: value })
  }

  const handleRatingChange = (e, {rating, maxRating}) => {
    updateEncounter({...encounter, rating})
  }

  return (
    <Modal
      open={open}
      onOpen={() => handleOpen(true)}
      onClose={() => handleOpen(false)}
      size='tiny'
      trigger={
        <Button
          primary
          inverted
          icon='checkmark'
          labelPosition='left'
          content='Yes, log it!'
        />
      }
    >
      <Modal.Header>Log Your Interaction</Modal.Header>
      <Modal.Content>
        <div>
          On <input type='date' value={encounter.date} name='date' onChange={e => updateEncounter({ ...encounter, date: e.target.value })} /> I remembered to <Input transparent value={encounter.verb} onChange={handleEncounterChange} name='verb' /> {contact.first_name}!
        </div>
        <div>
          <Rating icon='heart' maxRating={5} rating={encounter.rating} onRate={handleRatingChange}/>
        </div>
        <Form>
          <p>Additional Details: </p>
          <TextArea placeholder='Tell us more' value={encounter.details} name='details' onChange={handleEncounterChange} />
        </Form>

      </Modal.Content>
      <Modal.Actions>
        <Button icon='chevron left' content='Cancel' onClick={() => {
          setFeaturedReminder({})
          handleOpen(false)
        }} />
        <Button icon='check' content='Submit' onClick={handleAddEncounter} />
      </Modal.Actions>
    </Modal>
  )
}

const mapStateToProps = state => ({ featuredReminder: state.featuredReminder })

const mapDispatchToProps = dispatch => {
  return {
    creatingEncounter: encounter => dispatch(creatingEncounter(encounter)),
    setFeaturedReminder: reminder => dispatch(setFeaturedReminder(reminder))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EncounterForm)