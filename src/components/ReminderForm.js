import React from 'react'
import { connect } from 'react-redux'
import { addingReminder, updatingReminder } from '../redux/actions'
import { Header, Segment, Grid, Icon, Transition, Dropdown, Checkbox, Input, Button, Modal } from 'semantic-ui-react'
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment'

class ReminderForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      id: props.reminder ? props.reminder.id : null,
      msg: props.reminder ? props.reminder.msg : '',
      start_date: props.reminder ? moment(props.reminder.start_date).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'),
      end_date: props.reminder ? moment(props.reminder.end_date).format('YYYY-MM-DD') : '',
      interval: props.reminder ? props.reminder.interval : 1,
      period: props.reminder ? props.reminder.period : 'daily',
      recurring: props.reminder ? props.reminder.recurring : false,
      // snoozed: props.reminder ? props.reminder.snoozed : false,
      // current: props.reminder ? props.reminder.current : new Date(),
      priority: props.reminder ? props.reminder.priority : 1,
      contact_id: props.reminder ? props.reminder.contact_id : props.contact.id
    }
  }

  componentDidMount(){
    // console.log(this.state, this.props)

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
  handleStartDateChange = e => {
    this.state.end_date === '' ? this.setState({start_date: e.target.value, end_date: e.target.value}) : this.setState({start_date: e.target.value})
  }
  handleEndDateChange = e => this.setState({end_date: e.target.value})
  toggleRecurring = () => this.setState({ recurring: !this.state.recurring })

  handleSubmit =(e) => {
    e.stopPropagation()
    // console.log(this.state)
    // console.log(this.props)
    const newReminder = {...this.state}
    if (!this.state.recurring) {
      newReminder.end_date = newReminder.start_date
    }
    if (this.state.msg === '' || this.state.start_date === ''){
      alert('You are missing some values there, bud')
    } else if (this.props.reminder) {
      this.props.updatingReminder(newReminder)
      this.props.handleClose('editReminderModal')
      this.resetForm()
    } else {
      this.props.addingReminder(newReminder)
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
      {key: 'daily', text: 'day(s)', value: 'daily'},
      {key: 'weekly', text:'week(s)', value: 'weekly'},
      {key: 'monthly', text: 'month(s)', value: 'monthly'},
      {key: 'yearly', text: 'year(s)', value:'yearly'}
    ])
  }

  recurringDropdown = () => {
    return ([
      {key: 'on', text: 'on', value: false },
      {key: 'every', text: 'every', value:true }
    ])
  }

  priorityDropdown = () => {
    return ([
      {key: 'high', text: 'extremely important', value: 1},
      {key: 'medium', text:'important', value: 2},
      {key: 'low', text: 'kind of important', value: 3},
      {key: 'none', text: 'not at all important', value: 4}
    ])
  }

  render() {
    console.log(this.state.start_date)
    // const hello = this.state
    // debugger
    // console.log(this.props)
    if (this.props.loading) {
      return <h2>Loading...</h2>
    } else {
      return(
        <>
          <Modal.Header as='h2' attached='top'>{this.props.title}</Modal.Header>

          <Modal.Content>
            <span>
              I want to  <Input
                  placeholder='call, text, etc...'
                  transparent
                  type='text'
                  name='msg'
                  value={this.state.msg}
                  onChange={this.handleChange}
                />
              {/* </div> */}
              {this.props.contact.name}
              <Dropdown
                name='recurring'
                options={this.recurringDropdown()}
                onChange={this.toggleRecurring}
                value={this.state.recurring}
                inline
              />
              {
                this.state.recurring ? (
                  <>
                    <Input
                      transparent
                      type='number' 
                      name='interval' 
                      value={this.state.interval} 
                      onChange={this.handleChange} 
                      min='1'
                    />

                    <Dropdown
                      name='period'
                      // placeholder="Select and option"
                      options={this.periodDropdown()}
                      onChange={this.handlePeriodChange}
                      value={this.state.period}
                      inline
                    />
                    <br />
                    <span>starting on</span>
                  </>
                ) : null
              }
                <input
                  type='date'
                  className='date-picker'
                  name='start_date'
                  value={this.state.start_date}
                  onChange={this.handleStartDateChange}
                  // calendarIcon={<Icon name='calendar alternate outline' />}
                  // clearIcon={<Icon name='delete' />}
                />
              <span>
                {
                  !this.state.recurring ? <br /> : null
                }
                This is <Dropdown
                  name='priority'
                  options={this.priorityDropdown()}
                  onChange={this.handlePriorityChange}
                  value={this.state.priority}
                  inline
                />
              </span>
              {
                this.state.recurring ? (
                  <>
                    and should end on
                    <input
                      type='date'
                      className='date-picker'
                      name='end_date'
                      value={this.state.end_date}
                      onChange={this.handleEndDateChange}
                      // calendarIcon={<Icon name='calendar alternate outline' />}
                      // clearIcon={<Icon name='delete' />}
                    />
                  </>
                ) : null
              }
            </span>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.handleSubmit}>Remind Me!</Button>
            <Button onClick={(e) => {
              e.stopPropagation()
              this.props.handleClose('newReminderModal')
            }}>
              Nevermind
            </Button>
          </Modal.Actions>
        </>
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

/*
  < Grid divided = { this.state.recurring } >
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


          <Checkbox
            slider
            label='Recurring?'
            checked={this.state.recurring}
            onChange={this.toggleRecurring}
          />

          <p />

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




    </Grid.Row>
        </Grid >
        */