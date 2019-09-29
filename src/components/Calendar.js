import React, { PureComponent } from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import { connect } from 'react-redux'
import ReminderForm from '../components/ReminderForm'
import ReminderShow from '../components/ReminderShow'
import { Modal, Button, Segment } from 'semantic-ui-react'
import { deletingReminder } from '../redux/actions/actions'
import DeleteConfirmation from './DeleteConfirmation';
import 'react-big-calendar/lib/css/react-big-calendar.css'

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

  eventStyleGetter = (e, start, end, isSelected) => {
    let style = {
      backgroundColor: 'white',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'black',
      border: '0px',
      display: 'block',
      margin: '1px'
    }

    switch (e.priority){
      case 1:
        return {style: {...style, color: 'red'}}
      case 2:
        return {style: {...style, color: 'orange'}}
      case 3:
        return {style: {...style, color: 'blue'}}
      case 4: 
        return {style: {...style, color: 'grey'}}
      default:
        return {style: {...style, color: 'blue'}}
    }
  }

  filterReminders = () => {
    return this.props.recurringReminders.filter(r => this.props.calendarFilter === '' ? r : r.priority === this.props.calendarFilter)
  }

  render() {
    if (this.props.loading) {
      return <h1>Loading...</h1>
    } else {
      return (
        <div className='wrapper calendar'>
          <h1>Calendar</h1>
            <BigCalendar
              localizer={localizer}
              events={ this.filterReminders() }
              startAccessor='start'
              endAccessor='start'
              titleAccessor='msg'
              defaultView='month'
              views={['month', 'day', 'week']}
              alldayaccessor='all_day'
              popup
              selectable
              onSelectEvent={(event, e) => {this.handleOpen(event)}}
              eventPropGetter={(this.eventStyleGetter)}
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
    recurringReminders: state.recurringReminders,
    calendarFilter: state.calendarFilter
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deletingReminder: (reminder) => dispatch(deletingReminder(reminder))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar)