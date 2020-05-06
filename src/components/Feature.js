import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Grid, Segment, Image, Button, Modal, Label, Checkbox, List } from 'semantic-ui-react'
import '../App.css'
import { updatingReminder } from '../redux/actions/actions'
import Logo from './Logo'
import RemindersList from './RemindersList'

class Feature extends React.Component {
  constructor(){
    super()
    this.state = {
      toggleReminders: true,
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

  // styleSplash = () => {
  //   const { splash_image } = this.props.user
  //   // debugger
  //   return({
  //     backgroundImage: `url(${ splash_image === null ? 'https://cdn2.vectorstock.com/i/1000x1000/19/21/cartoon-clouds-isolated-on-blue-sky-panorama-vector-16631921.jpg' : splash_image })`,
  //     backgroundSize: 'cover',
  //     width: '100%,',
  //     height: '200px',
  //     display: 'flex',
  //     justifyContent: 'flex-end',
  //     flexDirection: 'column'
  //   })
  // }

  todaysReminders = () => {
    if (this.state.sortByPriority) {
      return this.props.reminders.filter(r => r.match).sort((a, b) => a.priority - b.priority)
    } else {
      return this.props.reminders.filter(r => r.match)
    }
  }

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
  

  render(){
    return (
      <Grid celled='internally' stackable columns='equal'>
        <Grid.Column>
            {this.todaysReminders().length === 0 || this.state.toggleReminders ?
            null
            :
            
            <Label as='a' color='red' ribbon='right' onClick={this.toggleReminders}>
              {this.todaysReminders().length} Reminder(s)
            </Label> }
            <Logo />
        </Grid.Column>
        {this.state.toggleReminders ? 
        <Grid.Column width={6}>
          <div className='reminders-container'>
            <RemindersList />
            {/* <h4>Current Reminders for: { moment().format('dddd, MMMM Do, YYYY') }</h4>
            <div className='reminders'>
              <List bulleted>
                {this.todaysReminders().map(r => (
                  <List.Item 
                    // inverted={r.priority === 5} 
                    color={this.displayPriorityColor(r)} 
                    key={r.id} 
                    onClick={() => this.show(r)}
                  >
                    {r.msg} {this.handleReminderSnooze(r)}
                  </List.Item>))}
              </List>
            </div> */}
            <div>
            {/* <Button onClick={this.toggleReminders} content='Close Reminders'/> */}
            <Checkbox 
              slider
              label='Sort By Priority'
              checked={this.state.sortByPriority}
              onChange={this.togglePrioritySort}
            />
            </div>
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