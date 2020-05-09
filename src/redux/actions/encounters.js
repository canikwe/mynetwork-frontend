import {  CREATE_ENCOUNTER } from '../types'
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

export { creatingEncounter }