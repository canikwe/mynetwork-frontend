import React from 'react'
import { connect } from 'react-redux'
import { addingReminder, updatingReminder } from '../redux/actions'
import { Header, Segment, Grid, Icon, Transition, Dropdown, Checkbox } from 'semantic-ui-react'
import DateTimePicker from 'react-datetime-picker';

class ReminderForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      id: props.reminder ? props.reminder.id : null,
      msg: props.reminder ? props.reminder.msg : '',
      start_date: props.reminder ? new Date(props.reminder.start_date) : '',
      end_date: props.reminder ? new Date(props.reminder.end_date) : '',
      interval: props.reminder ? props.reminder.interval : 1,
      period: props.reminder ? props.reminder.period : 'daily',
      recurring: props.reminder ? props.reminder.recurring : false,
      // snoozed: props.reminder ? props.reminder.snoozed : false,
      // current: props.reminder ? props.reminder.current : new Date(),
      priority: props.reminder ? props.reminder.priority : 'none',
      contact_id: props.reminder ? props.reminder.contact_id : props.contact.id
    }
  }

  componentDidMount(){
    console.log(this.state, this.props)

  }

  handleChange = e => {
    switch (e.target.name){
      case 'snoozed':
        return this.setState({snoozed: !this.state.snoozed})
      // case 'recurring':
      //   return this.setState({recurring: !this.state.recurring})
      default:
        return this.setState({[e.target.name]: e.target.value})
    }
  }

  handlePeriodChange = (e, { value }) => this.setState({period: value})
  handlePriorityChange = (e, { value }) => this.setState({priority: parseInt(value)})
  handleStartDateChange = date => this.state.end_date === '' ? this.setState({start_date: date, end_date: date}) : this.setState({start_date: date})
  handleEndDateChange = date => this.setState({end_date: date})
  toggleRecurring = () => this.setState({ recurring: !this.state.recurring })

  handleSubmit =(e) => {
    e.stopPropagation()
    console.log(this.state)
    console.log(this.props)
    
    if (this.state.msg === '' || this.state.start_date === ''){
      alert('You are missing some values there, bud')
    } else if (this.props.reminder) {
      this.props.updatingReminder(this.state)
      this.props.handleClose('editReminderModal')
      this.resetForm()
    } else {
      this.props.addingReminder(this.state)
      this.props.handleClose('newReminderModal')
      this.resetForm()
    }
  }

  resetForm = () => {
    this.setState({
      msg: '',
      day: 0,
      date: '',
      contact_id: 1
    })
  }

  periodDropdown = () => {
    return ([
      {key: 'daily', text: 'Daily', value: 'daily'},
      {key: 'weekly', text:'Weekly', value: 'weekly'},
      {key: 'monthly', text: 'Monthly', value: 'monthly'},
      {key: 'yearly', text: 'Yearly', value:'yearly'}
    ])
  }

  priorityDropdown = () => {
    return ([
      {key: 'high', text: 'High', value: 1},
      {key: 'medium', text:'Medium', value: 2},
      {key: 'low', text: 'Low', value: 3},
      {key: 'none', text: 'None', value: 4}
    ])
  }

  render() {
    console.log(this.state.priority)
    if (this.props.loading) {
      return <h2>Loading...</h2>
    } else {
      return(
        <div>
          <Header as='h2' attached='top'>{this.props.title}</Header>

          <Segment attached>
          <Grid divided={this.state.recurring}>
            <Grid.Row columns={2}>
            <Grid.Column>

            <div>
                <label htmlFor='msg'>Message: </label><p />
              <div className='ui input field'>
                <input
                  type='text' 
                  name='msg' 
                  value={this.state.msg} 
                  onChange={this.handleChange} />
              </div><p />

                <label htmlFor='start_date'>Start Date: </label><p />
              <div className='ui input' >
                <DateTimePicker 
                  className='date-picker' 
                  name='start_date' 
                  value={this.state.start_date} 
                  onChange={this.handleStartDateChange} 
                  calendarIcon={<Icon name='calendar alternate outline' />}
                  clearIcon={<Icon name='delete' />}
                />
              </div><p />

              <label htmlFor='priority'>Priority: </label><p />
                <Dropdown
                  name='priority'
                  placeholder="Select and option"
                  options={this.priorityDropdown()}
                  onChange={this.handlePriorityChange}
                  value={this.state.priority}
                  selection
                /><p />

              {/* <div className='ui mini checkbox'> */}
                {/* <label htmlFor='recurring'>Recurring ? </label>
                <div className='ui checkbox'> */}
                  <Checkbox 
                    slider
                    label='Recurring?'
                    checked={this.state.recurring}
                    onChange={this.toggleRecurring}
                  />

                {/* <input 
                  type='checkbox' 
                  name='recurring' 
                  checked={this.state.recurring} 
                  onChange={this.handleChange} 
                  tabIndex="0" >
                  </input><br />  */}
                {/* </div> */}
                <p />
              {/* </div><br /> */}

              {/* {this.state.recurring ? */}
              <button className='ui button' onClick={this.handleSubmit}>Submit</button>
              <button className='ui button' onClick={(e) => {
                e.stopPropagation()
                this.props.handleClose('newReminderModal')
                }
              }>Go Back</button>
            </div>
              </Grid.Column>
              <Grid.Column>
                <Transition animation='scale' duration={400} visible={this.state.recurring}>
                <div>
                  <label htmlFor='end_date'>End Date: </label><p />
                <div className='ui input'>
                  <DateTimePicker 
                    className='date-picker' 
                    name='end_date' 
                    value={this.state.end_date} 
                    onChange={this.handleEndDateChange}
                    calendarIcon={<Icon name='calendar alternate outline' />}
                    clearIcon={<Icon name='delete' />}
                  />
                </div><p />

                <label htmlFor='interval'>Interval: </label><p />
                <div className='ui input'>
                <input type='number' name='interval' value={this.state.interval} onChange={this.handleChange} min='1'></input> <br />
                </div><p />

                <label htmlFor='period'>Period: </label><p />
                <Dropdown
                  name='period'
                  placeholder="Select and option"
                  options={this.periodDropdown()}
                  onChange={this.handlePeriodChange}
                  value={this.state.period}
                  selection
                />
                </div>
              </Transition>
              </Grid.Column>
              {/* : null} */}

              {/* <label htmlFor='snoozed'>Snoozed ? </label>
              <input type='checkbox' name='snoozed' value={this.state.snoozed} checked={this.state.snoozed} onChange={this.handleChange}></input> <br />

              <label htmlFor='current'>Current: </label>
              <input type='date' name='current' value={this.state.current} onChange={this.handleChange}></input> <br />
            */}
              
      

        </Grid.Row>
        </Grid>
        </Segment>
        </div>
      )}
  }
}

const mapStateToProps = state => {
  return {
    contacts: state.contacts,
    loading: state.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addingReminder: (reminder) => dispatch(addingReminder(reminder)),
    updatingReminder: (reminder) => dispatch(updatingReminder(reminder))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReminderForm)
// export default ReminderForm