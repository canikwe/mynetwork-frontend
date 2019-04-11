import React from 'react'
import { connect } from 'react-redux'
import { months } from '../Dates'
import { Grid, Segment, Image } from 'semantic-ui-react'
import '../App.css'

class Feature extends React.Component {

  parseDate = () => {
    // console.log(months)
    return `${months()[new Date().getMonth()]} - ${new Date().getDate()}`
  }

  render(){

    return (
      <Grid celled='internally' stackable columns={2}>
        <Grid.Column >
          <div className='landing-image img-feature'>
            <Image 
              size='tiny'
              circular
              src={this.props.user.avatar}
              alt="avatar"
              spaced
            />
          </div>
        </Grid.Column>
        <Grid.Column >
          <React.Fragment>
            <h4>Current Reminders for: { this.parseDate() }</h4>
            <div className='reminders-container'>
                {this.props.reminders.map(r => r.match ? <Segment key={r.id} compact>{r.msg}</Segment> : null)}
            </div>
          </React.Fragment>
        </Grid.Column>
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