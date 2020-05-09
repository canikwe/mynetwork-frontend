import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Loader, Segment, Dimmer, Divider, Checkbox, Modal, Button, Header, Icon } from 'semantic-ui-react'
import { formatReminderToast } from '../helper/functions'
import { updatingReminder, addingEncounter } from '../redux/actions/actions'


const ReminderSnooze = ({ featuredReminder, snooze, updateSnooze, updateFeaturedReminder, updatingReminder, contacts }) => {
  const [encounterModal, updateEncounterModal] = useState(false)
  const snoozedReminder = { id: featuredReminder.id, snoozed: true, current: new Date() }
  const reminderAction = formatReminderToast(featuredReminder, contacts)

  const displayEncounterModal = () => {
    return (
      <Modal
        open={encounterModal}
        onOpen={() => updateEncounterModal(true)}
        onClose={() => updateEncounterModal(false)}
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
        <Modal.Header>Modal #2</Modal.Header>
        <Modal.Content>
          <p>That's everything!</p>
        </Modal.Content>
        <Modal.Actions>
          <Button icon='check' content='Submit' onClick={handleAddEncounter} />
        </Modal.Actions>
      </Modal>
    )
  }

  const handleSnooze = e => {
    e.stopPropagation()
    updateSnooze(false)
    updateFeaturedReminder({})
    updatingReminder(snoozedReminder)
  }

  const handleAddEncounter = (e) => {
    handleSnooze(e)
    addingEncounter({ 
      contact_id: featuredReminder.contact_id, 
      reminder_id: featuredReminder.id, 
      verb: featuredReminder.msg, 
      date: new Date() 
    })
  }

  return (
    <Modal basic size='small' open={snooze} onClose={() => updateSnooze(false)} >
      <Header icon='bell slash' content='Snooze Reminder' />
      <Modal.Content>
        <p>Did you remember to {reminderAction[0].toLowerCase() + reminderAction.slice(1)}?</p>
      </Modal.Content>
      <Modal.Actions>
        {/* <Button
          primary
          inverted
          icon='checkmark'
          labelPosition='left'
          content='Yes, log it!'
          onClick={(e) => {
            e.stopPropagation()
            // addingEncounter({ contact_id: featuredReminder.contact_id, reminder_id: featuredReminder.id, verb: featuredReminder.msg, date: new Date() })
            // updatingReminder(snoozedReminder)
            // updateSnooze(false)
            // updateFeaturedReminder({})
          }}
        /> */}
        {displayEncounterModal()}

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

const mapStateToProps = state => ({ contacts: state.contacts })

const mapDispatchToProps = dispatch => {
  return {
    updatingReminder: reminder => dispatch(updatingReminder(reminder)),
    addingEncounter: encounter => dispatch(addingEncounter(encounter))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReminderSnooze)