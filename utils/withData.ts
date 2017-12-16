import * as React from 'react'
import hoistnonstatic from 'hoist-non-react-statics'

interface withDataFetchOptions {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: any
}
export default function withData(fetchOptionsMapper: (props: any) => withDataFetchOptions): any {
  return (component: any) => {
    class WithFetchData extends React.Component {
      static getInitialProps (ctx) {
        const initialProps = {}

        if(component.getInitialProps) {
          return {
            ...component.getInitialProps(ctx),
            ...initialProps
          }
        } else {
          return initialProps
        }
      }
      constructor(props){
        super(props)
        /**
         * Prepare state for fetch data
         */
        this.state = {
          loading: true,
          data: undefined
        }
      }
      async fetchDatFromRemoteServer(options: withDataFetchOptions){
        /**
         * start using fetch to receive
         * data from remote server
         */
        const response = await fetch(options.url, options)

      }
      shouldComponentUpdate(nextProps){
        if(fetchOptionsMapper(this.props) !== fetchOptionsMapper(nextProps)) {
          return true
        } else {
          return false
        }
      }

      render() {
        return React.createElement(component, {

        })
      }
    }

  }
}