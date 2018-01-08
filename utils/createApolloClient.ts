import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { withClientState } from 'apollo-link-state'
import logger from './Logger'
import { ApolloLink } from 'apollo-link'
import gql from 'graphql-tag'
import apolloLogger from 'apollo-link-logger'

const introspectionQueryResultData = require('../fragmentTypes.json')
const fetch = require('isomorphic-fetch')

let isBrowser = (process as any).browser
if (!isBrowser) {
  let g = global as any
  g.fetch = fetch
}

function create(initialState, host, cookie?) {
  logger.log('create apollo client connect to ' + host)
  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData
  })
  /**
   * Create Apollo data cache
   */
  const cache = new InMemoryCache({
    fragmentMatcher,
    dataIdFromObject: (val: any) => {
      if (val._id) {
        return `${val.__typename}:${val._id}`
      }
      return null
    }
  }).restore(initialState || {})
  const stateLink = withClientState({
    cache: cache as any,
    resolvers: {}
  })
  let uri = '/graphql'
  if (typeof window === 'undefined') {
    uri = host ? `${host}/graphql` : 'http://localhost:3000/graphql'
  }
  const httpLink = new HttpLink({
    uri,
    headers: {
      cookie
    },
    fetch: fetch,
    fetchOptions: {
      credentials: 'same-origin' // Additional fetch() options like `credentials` or `headers`
    }
  })
  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
    link: ApolloLink.from([apolloLogger, stateLink, httpLink]),
    cache
  })
}

export default function initApollo(
  initialState: any,
  config: { host: string; cookie?: any }
) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!isBrowser) {
    return create(initialState, config.host, config.cookie)
  }

  // Reuse client on the client-side
  if (typeof window !== 'undefined') {
    let w = window as any
    if (!w.apolloClient) {
      w.apolloClient = create(initialState, config.host, config.cookie)
    }
    return w.apolloClient
  }
  throw new Error(
    'create apollo client error.... please checking createApolloClient.ts for more information'
  )
}
