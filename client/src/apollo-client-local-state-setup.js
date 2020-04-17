import { InMemoryCache, gql } from '@apollo/client'
import { COUNT_QUERY } from './graphql-crud/queries'

export const cache = new InMemoryCache()

export function writeInitialData() {
  cache.writeQuery({
    query: gql`
      query {
        count
      }
    `,
    data: {
      count: 0,
    },
  })
}

writeInitialData()

export function getResolvers() {
  return {
    Mutation: {
      toggleTodo: (_root, variables, { cache }) => {
        const id = cache.identify({
          __typename: 'TodoItem',
          id: variables.id,
        })
        cache.modify(id, {
          completed(value) {
            return !value
          },
        })
      },
      incrementCount: (_root, variables, { cache }) => {
        let { count } = cache.readQuery({ query: COUNT_QUERY })
        count = count + 1
        const data = { count }
        cache.writeQuery({ query: COUNT_QUERY, data })
        return data
      },
      decrementCount: (_root, variables, { cache }) => {
        let { count } = cache.readQuery({ query: COUNT_QUERY })
        count = count - 1
        const data = { count }
        cache.writeQuery({ query: COUNT_QUERY, data })
      },
    },
  }
}
