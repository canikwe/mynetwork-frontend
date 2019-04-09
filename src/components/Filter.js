import React from 'react'
import { connect } from 'react-redux'
import { updateSearchTerm } from '../redux/actions'

const Filter = props => {
  return (
    <div>
      <h4>Today I am a FUNCTIONING filter</h4>
      <h6>Currently for contact names only</h6>
      <label htmlFor='filter'>Filter: </label>
      <input type='text' value={props.searchTerm} onChange={(e) => props.updateSearchTerm(e.target.value)} name='filter'></input>
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