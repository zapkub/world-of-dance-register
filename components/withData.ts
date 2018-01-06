import * as React from 'react'
import PropTypes from 'prop-types'
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import initApollo from '../utils/createApolloClient'
import Head from 'next/head'
import ApolloClient from 'apollo-client'
import logger from '../utils/Logger'
const hoistStatic = require('hoist-non-react-statics')

export default function withApolloClient(ComposedComponent) {
  class WithData extends React.Component<any, any> {
    apollo: any
    constructor(props) {
      super(props)
      logger.log('Render Application with props')
      this.apollo = initApollo(this.props.serverState.apollo.data, props.config)
    }
    static async getInitialProps(ctx) {
      console.log('render')
      let p = process as any
      let serverState = {
        apollo: {}
      }
      let composedInitialProps: any = {}
      if (ComposedComponent.getInitialProps) {
        composedInitialProps = await ComposedComponent.getInitialProps(ctx)
      }
      /**
       * Fetch ssr data from server
       */
      if (!p.browser) {
        const host = `${ctx.req.protocol}://${ctx.req.headers.host}`
        const apolloClient = initApollo(undefined, {
          host,
          cookie: ctx.req.header('cookie')
        }) as ApolloClient<any>
        const url = { query: ctx.query, pathname: ctx.pathname }
        try {
          await getDataFromTree(
            React.createElement(
              ApolloProvider,
              {
                client: apolloClient
              },
              React.createElement(ComposedComponent, {
                url,
                ...composedInitialProps
              })
            )
          )
        } catch (e) {
          console.error('ssr failed')
          console.error(`url: ${host}`)
          console.error(e)
        }

        Head.rewind()
        serverState = {
          apollo: {
            data: apolloClient.cache.extract()
          }
        }

        composedInitialProps.config = {
          host,
          cookie: ctx.req.header('cookie')
        }
      }
      return {
        serverState,
        ...composedInitialProps
      }
    }
    render() {
      return React.createElement(
        ApolloProvider,
        {
          client: this.apollo
        },
        React.createElement(ComposedComponent, {
          ...this.props
        })
      )
    }
  }
  const getInitialProps = WithData.getInitialProps
  const result = hoistStatic(WithData, ComposedComponent) as any
  result.getInitialProps = getInitialProps
  return result
}
