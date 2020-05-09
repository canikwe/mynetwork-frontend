import React from 'react'
import { connect } from 'react-redux'
import { filterCalendar } from '../redux/actions/actions'
import { Dropdown } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

class Filter extends React.PureComponent {
  state = {
    visible: true
  }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })
  
  calendarPriorityOptions = () => {
    return ([
      {
        key: 'High',
        text: 'High',
        value: 1,
        label: { color: 'red', empty: true, circular: true },
      },
      {
        key: 'Medium',
        text: 'Medium',
        value: 2,
        label: { color: 'orange', empty: true, circular: true },
      },
      {
        key: 'Low',
        text: 'Low',
        value: 3,
        label: { color: 'blue', empty: true, circular: true },
      },
      {
        key: 'None',
        text: 'None',
        value: 4,
        label: { color: 'grey', empty: true, circular: true },
      },
      {
        key: 'All',
        text: 'All',
        value: '',
        label: { color: 'black', empty: true, circular: true },
      }      
    ])
  }

  handleChange = (e, { value }) => this.props.filterCalendar(value)

  render() {
    return (
      <div className='filter'>
      {this.props.location.pathname === '/calendar' ?
        <Dropdown text='Filter Reminders' icon='filter' pointing='top right' >
          <Dropdown.Menu>
            {/* <Input icon='search' iconPosition='left' className='search' />
            <Dropdown.Divider /> */}
            <Dropdown.Header icon='tags' content='Priority Level' />
            <Dropdown.Menu scrolling >
              {this.calendarPriorityOptions().map(option => (
                <Dropdown.Item onClick={this.handleChange} key={option.value} {...option} />
              ))}
            </Dropdown.Menu>
          </Dropdown.Menu>
        </Dropdown>
        : null
     }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { 
    searchTerm: state.searchTerm}
}

const mapDispatchToProps = dispatch => {
  return {
    filterCalendar: (value) => dispatch(filterCalendar(value))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Filter))