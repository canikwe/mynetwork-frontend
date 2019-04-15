import React from 'react'
import { connect } from 'react-redux'
import { updateSearchTerm } from '../redux/actions'
import { Input, Transition } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

class Filter extends React.PureComponent {
  state = {
    visible: true
  }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  render() {
    console.log(this.props.location.pathname)
    return (
      <div className='filter'>
        <Transition animation='jiggle' duration={500} visible={this.props.location.pathname === '/calendar' ? false : this.state.visible}>
          <Input
            icon='search' 
            type='text' 
            size='large' 
            value={this.props.searchTerm} 
            onChange={(e) => this.props.updateSearchTerm(e.target.value)}
            onFocus={this.toggleVisibility}
            name='filter' 
            placeholder='Search Contacts...'>
          </Input>
        </Transition>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {searchTerm: state.searchTerm}
}

const mapDispatchToProps = dispatch => {
  return { updateSearchTerm: (searchTerm) => dispatch(updateSearchTerm(searchTerm)) }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Filter))