import React from 'react'
import { Image, Header, Container, List, Icon, Divider, Modal, Grid, Button, Label } from 'semantic-ui-react'
import { connect } from 'react-redux'
import EditReminder from './EditReminder'
import moment from 'moment';
import { formatReminder } from '../helper/functions'
import ReminderForm from './ReminderForm'
import ContactForm from './ContactForm'
import { deletingContact, deletingReminder, deletingEncounter } from '../redux/actions'
import EncounterForm from './EncounterForm';

class ConactCardShow extends React.PureComponent {
  state = {
    editReminderModal: false,
    editingReminder: null,
    newReminderModal: false,
    editContactModal: false,
    deleteContactModal: false,
    newEncounterModal: false,
  }

  handleOpen = (modal) => this.setState({ [modal]: true })
  handleClose = (modal) => this.setState({ [modal]: false })
  handleEncounterModal = () => this.setState({ newEncounterModal: !this.state.newEncounterModal })

  toggleEditReminderModal = r => this.setState({editReminderModal: !this.state.editReminderModal, editingReminder: r})

  displayPriorityColor = (r) => {
    switch (r.priority){
      case 1:
        return 'red'
      case 2:
        return 'yellow'
      case 3:
        return 'blue'
      case 4: 
        return 'grey'
      default:
        return 'blue'
    }
  }

  displayPeriod = (r) => {
    switch (r.period) {
      case 'daily':
        return r.interval > 1 ? `every ${r.interval} days` : 'every day'
      case 'weekly':
        return r.interval > 1 ? `every ${r.interval} weeks` : 'every week'
      case 'monthly':
        return r.interval > 1 ? `every ${r.interval} months` : 'every month'
      case 'yearly':
        return r.interval > 1 ? `every ${r.interval} years` : 'every year'
      default:
        break;
    }
  }

  //Methods for Reminder CRUD Modals
  createReminderBtn = () => {
    return (
      <Modal
        size='tiny'
        trigger={<Button
          onClick={() => this.handleOpen('newReminderModal')}
          content='Add Reminder'
          primary
        />}
        open={this.state.newReminderModal}
        onClose={() => this.handleClose('newReminderModal')}
      >
        <ReminderForm contact={this.props.contact} title={'Create a new reminder!'} handleClose={() => this.handleClose('newReminderModal')} />
        <p />
      </Modal>
    )
  }

  // Methods for Contact CRUD Modals
  editContactBtn = () => {
    return (
      <Modal
        size='tiny'
        trigger={<Button
          onClick={() => this.handleOpen('editContactModal')}
          content='Edit Friend'
          basic
          color='green'
        />}
        open={this.state.editContactModal}
        onClose={() => this.handleClose('editContactModal')}
        closeIcon
      >
        <ContactForm contact={this.props.contact} handleClose={() => this.handleClose('editContactModal')} />
      </Modal>
    )
  }

  deleteContactBtn = () => {
    return (
      <Modal
        size='mini'
        trigger={<Button
          onClick={() => this.handleOpen('deleteContactModal')}
          content='Remove Friend'
          basic
          color='red'
        />}
        open={this.state.deleteContactModal}
        onClose={() => this.handleClose('deleteContactModal')}
      >
        <Header icon='trash' content='Delete this contact?' />
        <Modal.Content>
          <p>This is an irreversible action. Are you sure you want to proceed?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative content='No' onClick={() => this.handleClose('deleteContactModal')} />
          <Button positive icon='checkmark' labelPosition='right' content='Yes' onClick={() => {
            this.props.deletingContact(this.props.contact)
            this.handleClose('deleteContactModal')
          }
          } />
        </Modal.Actions>
      </Modal>
    )
  }

  // Methods for Encounter CRUD
  newEncounterBtn = () => <EncounterForm open={this.state.newEncounterModal} handleOpen={this.handleEncounterModal} contact={this.props.contact} />

  render(){
    const {contact: {name, created_at, details, encounters, kind}, reminders} = this.props
    return(
      <Grid columns='equal' padded stackable>
        <Grid.Row>
          <Grid.Column>
            <Header as='h2' dividing>
              <Header.Content>
                { name } 
                <Header.Subheader>Friends since { moment(created_at).format('ll') }</Header.Subheader>
              </Header.Content>
            </Header>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={2}>
          <Grid.Column width={4}>
            <Button>{kind}</Button>
          </Grid.Column>
          <Grid.Column>
            <p>
              {details}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus, nulla ut commodo sagittis, sapien dui mattis dui, non pulvinar lorem felis nec erat
            </p>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={4}>
          <Grid.Column>
            { this.createReminderBtn() }
          </Grid.Column>
          <Grid.Column>
            { this.newEncounterBtn() }
          </Grid.Column>
          <Grid.Column>
            { this.editContactBtn() }
          </Grid.Column>
          <Grid.Column>
            { this.deleteContactBtn() }
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={2}>
          <Grid.Column>
            <Header.Subheader>Current Reminders</Header.Subheader>
            <List verticalAlign='middle' divided>
              {reminders.filter(r => !r.expired).map(r => {
                return (
                  <List.Item key={r.id}>
                    <List.Content floated='right'>
                      <Icon name='trash alternate outline' onClick={() => this.props.deletingReminder(r)} />
                    </List.Content>
                    <List.Icon name='bell outline' color={this.displayPriorityColor(r)}/>
                    <List.Content>
                      <List.Header as='a' onClick={() => this.toggleEditReminderModal(r)}>
                        { formatReminder(r, null, name) }
                      </List.Header>
                      <List.Description>{r.recurring ? `${this.displayPeriod(r)}` : `on ${ moment(r.start_date).format('MMMM Do, YYYY')}`}</List.Description>
                    </List.Content>
                  </List.Item>          
                )}
              )}
              <EditReminder 
                modalOpen={this.state.editReminderModal} 
                reminder={this.state.editingReminder} 
                modalClose={this.toggleEditReminderModal} 
                contact={this.props.contact}
              />
            </List>
          </Grid.Column>
          <Grid.Column>
            <Header.Subheader>Activity Feed</Header.Subheader>
            <List>
              {encounters.map(e => (
                <List.Item key={e.id}>
                  <List.Content floated='right'>
                    <Icon name='trash alternate outline' onClick={() => this.props.deletingEncounter(e)}/>
                  </List.Content>
                  {/* <List.Icon name='comment' /> */}
                  <List.Content>
                    {`On ${moment(e.date).format('MMMM Do, YY')} you ${e.verb} ${name}`}
                  </List.Content>
                </List.Item>)
              )}
            </List>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  return { recurringReminders: state.recurring }
}

const mapDispatchToProps = dispatch => {
  return {
    deletingContact: contact => dispatch(deletingContact(contact)),
    deletingReminder: reminder => dispatch(deletingReminder(reminder)),
    deletingEncounter: encounter => dispatch(deletingEncounter(encounter))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConactCardShow)