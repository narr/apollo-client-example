import React, { useState } from 'react'
import { useQuery, gql } from '@apollo/client'

const SEARCH_QUERY = gql`
  query searchQuery($name: String) {
    names(name: $name) {
      firstName
      lastName
    }
  }
`
const getNames = names =>
  names.map(({ firstName, lastName }) => <p key={`${firstName}-${lastName}`}>{`${firstName} ${lastName}`}</p>)

export default function Search() {
  const [name, setName] = useState()
  const { loading, error, data } = useQuery(SEARCH_QUERY, {
    variables: { name },
    skip: name == null,
  })
  if (loading) {
    return <p>Loading...</p>
  }
  return (
    <div>
      <input
        type="text"
        autoFocus
        placeholder="search for a name..."
        value={name}
        onChange={e => {
          setName(e.target.value)
        }}
      />
      <div>{name != null && getNames(data.names)}</div>
    </div>
  )
}
