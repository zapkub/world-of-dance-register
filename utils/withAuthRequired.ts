import * as React from 'react'
const { Router } = require('../routes').default

const hoistnonstatic = require('hoist-non-react-statics')

export default function withData(redirectPath: string): any {
  return (component: any) => {
    class enhancedComponent extends React.Component<{user: any}, {}> {
      static getInitialProps (ctx) {
        const initialProps: any = {}
        initialProps.user = ctx.req.user
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
  
      }
      componentDidMount(){
        if(!this.props.user) {
          console.warn('user not found')
          Router.replace('/')
        } 
      }

      render() {
        if(!this.props.user) {
          return React.createElement('div',{}, 'unauthorized')
        }
        return React.createElement(component, {
          ...this.props
        })
      }
    }

    return hoistnonstatic(enhancedComponent, component)
  }
}