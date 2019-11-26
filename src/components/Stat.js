import React from 'react'

const Stat = ({ todo, number }) => {
  return (
    <li>You sent {number} {todo} Last Week</li>
  )
}

export default Stat