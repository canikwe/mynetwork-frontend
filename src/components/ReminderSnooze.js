import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Modal, Button, Header } from 'semantic-ui-react'
import { formatReminderToast } from '../helper/functions'
import { updatingReminder, creatingEncounter, setFeaturedReminder } from '../redux/actions'
import EncounterForm from './EncounterForm'


const ReminderSnooze = ({ featuredReminder, updateFeaturedReminder, updatingReminder, contacts }) => {
  const [encounterModal, updateEncounterModal] = useState(false)
  const snoozedReminder = { id: featuredReminder.id, snoozed: true, current: new Date() }
  const reminderAction = formatReminderToast(featuredReminder, contacts)

  const handleSnooze = e => {
    e.stopPropagation()
    updateFeaturedReminder({})
    updatingReminder(snoozedReminder)
  }

  const getContact = () => {
    return contacts.find(c => c.id === featuredReminder.contact_id)
  }

  return (
    <Modal basic size='small' open={!!featuredReminder.id} onClose={() => updateFeaturedReminder({})} >
      <Header icon='bell slash' content='Snooze Reminder' />
      <Modal.Content>
        <p>Did you remember to {reminderAction[0].toLowerCase() + reminderAction.slice(1)}?</p>
      </Modal.Content>
      <Modal.Actions>

        <EncounterForm open={encounterModal} handleOpen={updateEncounterModal} handleSnooze={handleSnooze} contact={getContact()}/>

        <Button
          color='grey'
          icon='checkmark'
          labelPosition='left'
          content='No, snooze anyway.'
          inverted
          onClick={handleSnooze}
        />

      </Modal.Actions>
    </Modal>
  )
}

const mapStateToProps = state => ({ contacts: state.contacts, featuredReminder: state.featuredReminder })

const mapDispatchToProps = dispatch => {
  return {
    updatingReminder: reminder => dispatch(updatingReminder(reminder)),
    creatingEncounter: encounter => dispatch(creatingEncounter(encounter)),
    updateFeaturedReminder: reminder => dispatch(setFeaturedReminder(reminder))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReminderSnooze)