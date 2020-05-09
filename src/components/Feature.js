import React from 'react'
import { connect } from 'react-redux'
import { Grid, Label } from 'semantic-ui-react'
import '../App.css'
import Logo from './Logo'
import RemindersList from './RemindersList'

class Feature extends React.Component {
  constructor(){
    super()
    this.state = {
      toggleReminders: false,
    }
  }

  toggleReminders = () => this.setState({toggleReminders: !this.state.toggleReminders})

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
          <RemindersList />
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

export default connect(mapStateToProps)(Feature)