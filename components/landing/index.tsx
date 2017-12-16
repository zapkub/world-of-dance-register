import * as React from 'react'
import { compose } from 'recompose'
import withSession from '../../utils/withSession'



class LandingPage extends React.Component {
  render() {
    return (
      <div>
        {'Landing'}
        <a href='/facebook'> login </a>
      </div>
    )
  }
}
export default compose(
  withSession
)(LandingPage)