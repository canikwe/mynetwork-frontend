import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Grid, Segment, Image, Transition, Button, Modal } from 'semantic-ui-react'
import '../App.css'
import { updatingReminder } from '../redux/actions'

class Feature extends React.Component {
  constructor(){
    super()
    this.state = {
      toggleReminders: false,
      openSnooze: false
    }
  }

  show = () => this.setState({ openSnooze: true })
  close = () => this.setState({ openSnooze: false })

  toggleReminders = () => this.setState({toggleReminders: !this.state.toggleReminders})

  handleReminderSnooze = r =>{
    
    const snoozedReminder = {...r, snoozed: true, current: new Date()}
    return (
      <Modal size='tiny' open={this.state.openSnooze} onClose={this.close} >
          <Modal.Header>Snooze</Modal.Header>
          <Modal.Content>
            <p>Would you like to snooze this notification? { r.msg }</p>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={(e) => {
              e.stopPropagation()
              this.close()
            }} >No</Button>
            <Button 
              positive 
              icon='checkmark' 
              labelPosition='right' 
              content='Yes' 
              onClick={(e) => {
                e.stopPropagation()
                this.close()
                this.props.updatingReminder(snoozedReminder)
                }} 
              />
          </Modal.Actions>
      </Modal>
    )
  }

  render(){
    return (
      <Grid celled='internally' stackable columns='equal'>
        <Grid.Column>
          <div className='landing-image img-feature' onClick={this.toggleReminders}>
            <Image 
              size='tiny'
              circular
              src={this.props.user.avatar}
              alt="avatar"
              spaced
            />
          </div>
        </Grid.Column>
        {this.state.toggleReminders ? 
        <Grid.Column width={5}>
          <div>
            <h4>Current Reminders for: { moment().format('dddd, MMMM Do, YYYY') }</h4>
            <div className='reminders-container'>
                {this.props.reminders.map(r => r.match ? <Segment key={r.id} onClick={this.show}>{r.msg} {this.handleReminderSnooze(r)}</Segment> : null)}
            </div>
            
            <Button onClick={this.toggleReminders} content='Close Reminders'/>
          </div>
        </Grid.Column>
        : null
        }
      </Grid>)
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    reminders: state.reminders
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updatingReminder: reminder => dispatch(updatingReminder(reminder))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feature)