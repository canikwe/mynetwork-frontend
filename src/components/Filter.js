import React from 'react'
import { connect } from 'react-redux'
import { updateSearchTerm } from '../redux/actions'
import { Input } from 'semantic-ui-react'

const Filter = props => {
  return (
    <div>
      <h3>Contacts: 
      <span>
        <Input icon='search' type='text' size='mini' value={props.searchTerm} onChange={(e) => props.updateSearchTerm(e.target.value)} name='filter' placeholder='Search...'></Input>
      </span>
      </h3>
    </div>
  )
}

const mapStateToProps = state => {
  return {searchTerm: state.searchTerm}
}

const mapDispatchToProps = dispatch => {
  return { updateSearchTerm: (searchTerm) => dispatch(updateSearchTerm(searchTerm)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)