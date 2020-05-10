import {  CREATE_ENCOUNTER, DELETE_ENCOUNTER } from '../types'
import { authHeaders, URL } from '../types'

const creatingEncounter = encounter => {
  return (dispatch) => {
    fetch(`${URL()}/encounters`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ encounter })
    })
      .then(res => res.json())
      .then(encounter => dispatch(createEncounter(encounter)))
  }
}

const createEncounter = encounter => {
  return {type: CREATE_ENCOUNTER, encounter}
}

const deletingEncounter = encounter => {
  return (dispatch) => {
    fetch(`${URL()}/encounters/${encounter.id}`, {
      method: 'DELETE',
      headers: authHeaders()
    })
      .then(res => res.json())
      .then(encounter => dispatch(deleteEncounter(encounter)))
  }
}

const deleteEncounter = encounter => {
  return { type: DELETE_ENCOUNTER, encounter }
}

export { creatingEncounter, deletingEncounter }