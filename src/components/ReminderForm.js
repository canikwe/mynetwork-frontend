import React from 'react'
// import { week } from '../Dates'
import { connect } from 'react-redux'
import { addingReminder, updatingReminder } from '../redux/actions'
import { Header, Segment, Grid } from 'semantic-ui-react'
import '../App.css'

class ReminderForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      id: props.reminder ? props.reminder.id : null,
      msg: props.reminder ? props.reminder.msg : '',
      start_date: props.reminder ? props.reminder.start_date : '',
      interval: props.reminder ? props.reminder.interval : 1,
      period: props.reminder ? props.reminder.period : 'daily',
      recurring: props.reminder ? props.reminder.recurring : false,
      // snoozed: props.reminder ? props.reminder.snoozed : false,
      // current: props.reminder ? props.reminder.current : new Date(),
      contact_id: props.contact.id
    }
  }

  componentDidMount(){
    console.log(this.state, this.props)

  }

  handleChange = e => {
    switch (e.target.name){
      case 'snoozed':
        return this.setState({snoozed: !this.state.snoozed})
      case 'recurring':
        return this.setState({recurring: !this.state.recurring})
      default:
        return this.setState({[e.target.name]: e.target.value})
    }
  }

  handleSubmit =(e) => {
    e.preventDefault()
    console.log(this.state)
    console.log(this.props)
    
    if (this.state.msg === '' || this.state.start_date === ''){
      alert('You are missing some values there, bud')
    } else if (this.props.reminder) {
      this.props.updatingReminder(this.state)
      this.props.handleClose('editReminderModalOpen')
      this.resetForm()
    } else {
      this.props.addingReminder(this.state)
      this.props.handleClose('newReminderModalOpen')
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

  render() {
    
    if (this.props.loading) {
      return <h2>Loading...</h2>
    } else {
      return(
        <div>
          <Header as='h2' attached='top'>{this.props.title}</Header>

          <Segment attached>
          <Grid divided>
            <Grid.Row columns={2}>
            <Grid.Column>

            <form onSubmit={this.handleSubmit}>
              <div className='ui mini input'>
                {/* <label htmlFor='msg'>Message: </label> */}
                <input type='text' name='msg' value={this.state.msg} onChange={this.handleChange} placeholder='Message'></input>
              </div><br />

              <div className='ui mini input'>
              <label htmlFor='start_date'>Start Date: </label>
              <input type='date' name='start_date' value={this.state.start_date} onChange={this.handleChange}></input>
              </div><br />

              {/* <div className='ui mini checkbox'> */}
                <label htmlFor='recurring'>Recurring ? </label>
                <input type='checkbox' name='recurring' checked={this.state.recurring} onChange={this.handleChange} ></input><br /> 
              {/* </div><br /> */}

              {this.state.recurring ?
              <Grid.Column>
                <label htmlFor='interval'>Interval: </label>
                <input type='number' name='interval' value={this.state.interval} onChange={this.handleChange} min='1'></input> <br />

                <label htmlFor='period'>Period: </label>
                <select name='period' onChange={this.handleChange} defaultValue={this.state.period}>
                  <option value='daily'>Daily</option>
                  <option value='weekly'>Weekly</option>
                  <option value='monthly'>Monthly</option>
                  <option value='yearly'>Yearly</option>
                </select><br />
              </Grid.Column> : null}

              {/* <label htmlFor='snoozed'>Snoozed ? </label>
              <input type='checkbox' name='snoozed' value={this.state.snoozed} checked={this.state.snoozed} onChange={this.handleChange}></input> <br />

              <label htmlFor='current'>Current: </label>
              <input type='date' name='current' value={this.state.current} onChange={this.handleChange}></input> <br />
            */}
              
              <button className='ui button' type='submit'>Submit</button>
      
            </form>

        </Grid.Column>
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