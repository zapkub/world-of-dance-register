import * as React from 'react'
const { Router } = require('../routes').default

const hoistnonstatic = require('hoist-non-react-statics')

export default function withData(component: any): any {
  class enhancedComponent extends React.Component<{ user: any }, {}> {
    static getInitialProps(ctx) {
      const initialProps: any = {}
      if (typeof window !== 'undefined') {
        initialProps.user = (window as any).user
      } else {
        initialProps.user = ctx.req.user
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
      if (typeof window !== 'undefined') {
        (window as any).user = props.user
      }
      /**
       * Prepare state for fetch data
       */

    }
    displayName = `withSession.${component.displayName}`
    render() {
      return React.createElement(component, {
        ...this.props
      })
    }
  }

  return hoistnonstatic(enhancedComponent, component)
}
