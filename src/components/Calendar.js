import React, { PureComponent } from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import { connect } from 'react-redux'
import ReminderForm from '../components/ReminderForm'
import ReminderShow from '../components/ReminderShow'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Dropdown, Menu, Modal, Button, Header, Segment } from 'semantic-ui-react'
import { deletingReminder } from '../redux/actions'
import DeleteConfirmation from './DeleteConfirmation';



const localizer = BigCalendar.momentLocalizer(moment)


class Calendar extends PureComponent {
  constructor() {
    super()
    this.state = {
      modalOpen: false,
      featuredEvent: {},
      editForm: false,
      // deleteConfirmation: false
    }
  }

  handleOpen = (event) => this.setState({modalOpen: true, featuredEvent: event})
  handleClose = () => this.setState({modalOpen: false, editForm: false, deleteConfirmation: false})
  toggleEditForm = () => this.setState({editForm: !this.state.editForm})
  // openDeleteConfirmation = () => this.setState({deleteConfirmation: true})
  closeDeleteConfirmation = () => this.setState({deleteConfirmation: false, editForm: false, modalOpen: false})

  render() {
    if (this.props.loading) {
      return <h1>Loading...</h1>
    } else {
      return (
        <div className='wrapper calendar'>
          <h1>Calendar</h1>
            <BigCalendar
              localizer={localizer}
              events={this.props.recurringReminders}
              startAccessor='start'
              endAccessor='start'
              titleAccessor='msg'
              defaultView='month'
              views={['month', 'day', 'week']}
              alldayaccessor='all_day'
              popup
              selectable
              onSelectEvent={(event, e) => {this.handleOpen(event)}}
            />

        <Modal
          open={this.state.modalOpen}
          onClose={() => {
            this.toggleEditForm()
            this.handleClose()
          }} 
          size='small'
        >
        {!this.state.editForm ? 
        <Segment>
          <ReminderShow
            reminder={this.state.featuredEvent}
            handleClose={this.handleClose}
          />
          <Button content='Edit Reminder' onClick={this.toggleEditForm}/> 
          <DeleteConfirmation reminder={this.state.featuredEvent} handleClose={this.closeDeleteConfirmation}/>
        </Segment>
        :
        <ReminderForm 
          contact={null} 
          title={'Update reminder!'} 
          reminder={this.state.featuredEvent} 
          handleClose={this.handleClose}
        />
      }
      </Modal>

        </div>
      )
    }

  }
}



const mapStateToProps = state => {
  return {
    reminders: state.reminders,
    loading: state.loading,
    recurringReminders: state.recurringReminders
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deletingReminder: (reminder) => dispatch(deletingReminder(reminder))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar)