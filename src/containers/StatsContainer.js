import React from 'react'
// import Stat from '../components/Stat'

const dummyArray = [
  {id: 1, todo: 'texts', number: 2},
  {id: 2, todo: 'emails', number: 4},
  {id: 3, todo: 'conversations', number: 10}
]

const dummyHash = {
  texts: 2,
  emails: 4, 
  conversations: 10
}

const StatsContainer = () => {
  return (
    <>
      <h1>Weekly Stats!</h1>
        <ul>
          <li>You sent { dummyHash['texts'] } texts last week</li>
          <li>You had { dummyHash['conversations'] } convos last week</li>
          <li>You sent { dummyHash['emails'] } emails last week</li>
        </ul>
    </>
  )
}

export default StatsContainer

// This connects to an array of interaction objects
// Filter the interactions for this (or last) week only
// Loop over the array to shape data like dummyProps?
// Would be nice to get the most prolific contact of the week?
// Do not think I need a Stat Component for this