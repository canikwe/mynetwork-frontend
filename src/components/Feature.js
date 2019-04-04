import React from 'react'
import { connect } from 'react-redux'
import '../App.css'

class Feature extends React.Component {
  render(){
    console.log(this.props)
    // debugger
      return (<div>
        <h3>Welcome, {this.props.user.name}</h3>
        <div>
          <img src="https://images.unsplash.com/photo-1554004389-abf213c41d0d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1491&q=80" alt="feature" />
          <div>
            But before that, an alert box!
          </div>
          
          <div>
            <h4>One day, I shall be a filter</h4>
          </div>
        </div>
      </div>)
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    loading: state.loading
  }
}

export default connect(mapStateToProps)(Feature)