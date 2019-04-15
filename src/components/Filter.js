import React from 'react'
import { connect } from 'react-redux'
import { updateSearchTerm } from '../redux/actions'
import { Input, Transition } from 'semantic-ui-react'

class Filter extends React.PureComponent {
  state = {
    visible: true
  }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  render() {
    return (
      <div className='filter'>
        <Transition animation='jiggle' duration={500} visible={this.state.visible}>
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

export default connect(mapStateToProps, mapDispatchToProps)(Filter)