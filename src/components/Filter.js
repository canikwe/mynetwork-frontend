import React from 'react'
import { connect } from 'react-redux'
import { updateSearchTerm } from '../redux/actions'
import { Input } from 'semantic-ui-react'

const Filter = props => {
  return (
    <div className='filter'>
        <Input icon='search' type='text' size='small' value={props.searchTerm} onChange={(e) => props.updateSearchTerm(e.target.value)} name='filter' placeholder='Search Contacts...'></Input>
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