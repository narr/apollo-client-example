import React from 'react'
import { gql, useMutation } from '@apollo/client'
import './send-notification-bar.css'

const INCREMENT_COUNT = gql`
  mutation incrementCount {
    incrementCount @client
  }
`

const DECREMENT_COUNT = gql`
  mutation decrementCount {
    decrementCount @client
  }
`

export default function NotificationBar() {
  const [incrementCount, data] = useMutation(INCREMENT_COUNT)
  const [decrementCount] = useMutation(DECREMENT_COUNT)
  console.log(data)
  return (
    <div className="send-notification-bar">
      <p>
        <span role="img" aria-label="icon">
          🔥🔥
        </span>{' '}
        Send a notification using local state:{' '}
        <span role="img" aria-label="icon">
          🔥🔥
        </span>
      </p>
      <button onClick={incrementCount}>Increment counter</button>
      <button onClick={decrementCount}>Decrement counter</button>
    </div>
  )
}
