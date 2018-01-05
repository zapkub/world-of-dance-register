import { compose, lifecycle } from 'recompose'
import Login from './components/Login'
import routes from '../../routes'
import withSession from '../../utils/withSession'

export default compose(
  withSession,
  lifecycle<any, any, any>({
    componentDidMount() {
      if (this.props.user) {
        routes.Router.replaceRoute('profile')
      }
    }
  })
)(Login)
