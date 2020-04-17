import React from 'react'
import { useQuery } from '@apollo/client'
import './notification-bar.css'
import { COUNT_QUERY } from './graphql-crud/queries'

export default () => {
  const { loading, error, data } = useQuery(COUNT_QUERY)
  if (loading) {
    return <h1>loading...</h1>
  }
  return <div className="notification-bar">Count: {data.count}</div>
}
