import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Grid, Segment, Image, Transition } from 'semantic-ui-react'
import '../App.css'

class Feature extends React.Component {
  constructor(){
    super()
    this.state = {
      toggleReminders: false
    }
  }

  toggleReminders = () => this.setState({toggleReminders: !this.state.toggleReminders})

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
          <div onClick={this.toggleReminders}>
            <h4>Current Reminders for: { moment().format('dddd, MMMM Do, YYYY') }</h4>
            <div className='reminders-container'>
                {this.props.reminders.map(r => r.match ? <Segment key={r.id} compact>{r.msg}</Segment> : null)}
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

export default connect(mapStateToProps)(Feature)