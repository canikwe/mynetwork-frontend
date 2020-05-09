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
      .then(console.log)
  }
}

export { creatingEncounter }