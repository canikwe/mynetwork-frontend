import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Grid, Segment, Image, Transition, Button, Modal, Label, Checkbox } from 'semantic-ui-react'
import '../App.css'
import { updatingReminder } from '../redux/actions'

class Feature extends React.Component {
  constructor(){
    super()
    this.state = {
      toggleReminders: false,
      openSnooze: false,
      featuredReminder: {},
      sortByPriority: false
    }
  }

  show = (featuredReminder) => this.setState({ openSnooze: true, featuredReminder })
  close = () => this.setState({ openSnooze: false })

  toggleReminders = () => this.setState({toggleReminders: !this.state.toggleReminders})
  togglePrioritySort = () => this.setState({sortByPriority: !this.state.sortByPriority})

  handleReminderSnooze = () =>{
    const { openSnooze, featuredReminder } = this.state
    const snoozedReminder = {...featuredReminder, snoozed: true, current: new Date()}
    return (
      <Modal size='tiny' open={openSnooze} onClose={this.close} >
          <Modal.Header>Snooze</Modal.Header>
          <Modal.Content>
            {featuredReminder.snoozed ? 
            <p>This reminder has been snoozed for today!</p> :
            <p>Would you like to snooze this notification? { featuredReminder.msg }</p>
            }
          </Modal.Content>
          <Modal.Actions>
            {featuredReminder.snoozed ? 
            <Button basic onClick={(e) => {
              e.stopPropagation()
              this.close()
            }} >Back </Button>
            :
            <React.Fragment>
              <Button negative onClick={(e) => {
                e.stopPropagation()
                this.close()
              }}> No</Button>
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
            </React.Fragment>
            }
          </Modal.Actions>
      </Modal>
    )
  }

  todaysReminders = () => {
    if (this.state.sortByPriority) {
      return this.props.reminders.filter(r => r.match).sort((a, b) => a.priority - b.priority)
    } else {
      return this.props.reminders.filter(r => r.match)
    }
  }

  render(){
    return (
      <Grid celled='internally' stackable columns='equal'>
        <Grid.Column>
          <Segment raised>
            <Label as='a' color='red' ribbon='right' onClick={this.toggleReminders}>
              {this.todaysReminders().length} Reminders
            </Label> 
          <div className='landing-image img-feature' >
            <Image 
              size='tiny'
              circular
              src={this.props.user.avatar}
              alt="avatar"
              spaced
            />
          </div>
          </Segment>
        </Grid.Column>
        {this.state.toggleReminders ? 
        <Grid.Column width={5}>
          <div>
            <h4>Current Reminders for: { moment().format('dddd, MMMM Do, YYYY') }</h4>
            <div className='reminders-container'>
                {this.todaysReminders().map(r => <Segment inverted={r.priority === 1} color={r.priority === 1 ? 'red' : null} key={r.id} onClick={() => this.show(r)}>{r.msg} {this.handleReminderSnooze(r)}</Segment>)}
            </div>
            
            <Button onClick={this.toggleReminders} content='Close Reminders'/>
            <Checkbox 
              slider
              label='Sort By Priority'
              checked={this.state.sortByPriority}
              onChange={this.togglePrioritySort}
            />
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