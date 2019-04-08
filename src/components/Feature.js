import React from 'react'
import { connect } from 'react-redux'
import '../App.css'

class Feature extends React.Component {
  render(){
    // debugger
      return (<div>
        <h3>Welcome, {this.props.user.name}</h3>
        <div>
          <div>
            <img className='img-feature' src="https://images.unsplash.com/photo-1554004389-abf213c41d0d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1491&q=80" alt="feature" />
            <div className='reminder-feature'>
              I am a container of reminders: Change to Upcoming reminders only
              <ul>
                {this.props.reminders.filter(r => r.day > (new Date()).getDay() - 1).map(r => <li key={r.id}>{r.msg}</li>)}
              </ul>
            </div>
          </div>

        </div>
      </div>)
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    reminders: state.reminders
  }
}

export default connect(mapStateToProps)(Feature)