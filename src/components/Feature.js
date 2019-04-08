import React from 'react'
import { connect } from 'react-redux'
import { months } from '../Dates'
import '../App.css'

class Feature extends React.Component {

  parseDate = () => {
    console.log(months)
    return `${months[new Date().getMonth()]} - ${new Date().getDate()}`
  }

  render(){
    // debugger
      return (<div>
        <h3>Welcome, {this.props.user.name}</h3>
        <div>
          <div>
            <img className='img-feature' src="https://images.unsplash.com/photo-1554004389-abf213c41d0d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1491&q=80" alt="feature" />
            <div className='reminder-feature'>
              <h4>Current Reminders for: { this.parseDate() }</h4>
              <ul>
                {this.props.reminders.map(r => r.match ? <li key={r.id}>{r.msg}</li> : null)}
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