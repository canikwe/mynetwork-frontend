import React from 'react'
import { connect } from 'react-redux'
import '../App.css'

class Feature extends React.Component {
  render(){
    console.log(this.props)
    // debugger
    if (this.props.loading) {
      return <h3>Loading . . . </h3>
    } else {
      return (<div>
        <h3>Welcome, {this.props.user.name}</h3>
        <div>
          <img src="https://images.unsplash.com/photo-1554004389-abf213c41d0d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1491&q=80" alt="feature" />
          <div>
 
              {/* may need to update with backend refactor */}
              {this.props.user.contacts.map(c => {
                return (
                  <div className='reminder-box' key={c.id}>
                    Contact Card For: {c.name}
                <ul>
                  {c.reminders.map(r => <li key={r.id}>{r.msg}</li>)}
                </ul>
                </div>
                )
                })
              }

          </div>
        </div>
      </div>)
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    loading: state.loading
  }
}

export default connect(mapStateToProps)(Feature)