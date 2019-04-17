import React from 'react'
import { connect } from 'react-redux'
import { updateSearchTerm, filterCalendar } from '../redux/actions'
import { Input, Transition, Dropdown } from 'semantic-ui-react'
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
        key: 'Clear',
        text: 'Clear',
        value: '',
        label: { color: 'black', empty: true, circular: true },
      }      
    ])
  }

  handleChange = (e, { value }) => this.props.filterCalendar(value)

  render() {
    return (
      <div className='filter'>
      {this.props.location.pathname !== '/calendar' ?
        <Transition animation='jiggle' duration={500} visible={ this.state.visible }>
          <Input
            icon='search' 
            type='text' 
            size='large' 
            value={this.props.searchTerm} 
            onChange={(e) => this.props.updateSearchTerm(e.target.value)}
            onClick={this.toggleVisibility}
            name='filter' 
            placeholder='Search Contacts...'>
          </Input>
        </Transition>
        :
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
    updateSearchTerm: (searchTerm) => dispatch(updateSearchTerm(searchTerm)),
    filterCalendar: (value) => dispatch(filterCalendar(value))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Filter))