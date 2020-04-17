import { ApolloClient, HttpLink } from '@apollo/client'
import { cache, writeInitialData, getResolvers } from './apollo-client-local-state-setup'

const client = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: 'http://localhost:4000',
  }),
  resolvers: getResolvers(),
})

client.onResetStore(writeInitialData)

export default client
