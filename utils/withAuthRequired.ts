import * as React from 'react'
const { Router } = require('../routes').default

const hoistnonstatic = require('hoist-non-react-statics')

export default function withData(redirectPath: string): any {
  return (component: any) => {
    class enhancedComponent extends React.Component<{ user: any }, {}> {
      static getInitialProps(ctx) {
        const initialProps: any = {}

        if (typeof window === 'undefined') {
          initialProps.user = ctx.req.user
        } else {
          initialProps.user = ( window as any ).user
        }
        if (component.getInitialProps) {
          return {
            ...component.getInitialProps(ctx),
            ...initialProps
          }
        } else {
          return initialProps
        }
      }
      constructor(props) {
        super(props)
        /**
         * Prepare state for fetch data
         */
        if(typeof window !== 'undefined') {
          (window as any).user = props.user
        }
      }
      componentDidMount() {
        if (!this.props.user) {
          console.warn('user not found')
          Router.replaceRoute(redirectPath)
        }
      }

      render() {
        if (!this.props.user) {
          return React.createElement('div', {}, 'unauthorized')
        }
        return React.createElement(component, {
          ...this.props
        })
      }
    }

    return hoistnonstatic(enhancedComponent, component)
  }
}
