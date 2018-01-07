import * as React from 'react'
import { compose, withProps } from 'recompose'
import withRequiredAuth from '../withAuthRequired'
import withVideoUpload from '../withVideoUpload'
import ProfileInfoForm from './components/ProfileInfoForm'
import Menubar from '../Menubar'
import { graphql, withApollo } from 'react-apollo'
import withData from '../withData'
import gql from 'graphql-tag'
import { HeaderOne } from '../Header'
import { ApolloClient } from 'apollo-client'
import AuditionMenu from './components/AuditionMenu'
import { DefaultViewport } from '../Viewport'

interface ProfilePagePropTypes
  extends WithVideoUploadPropType,
    WithSessionPropTypes {
  me: User
  onProfileChange: (key: string, value: string) => void
}

class ProfilePage extends React.Component<ProfilePagePropTypes, any> {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <Menubar noSticky />
        <ProfileInfoForm
          onChange={this.props.onProfileChange}
          {...this.props.me}
        />
        <DefaultViewport style={{paddingTop: 0, paddingBottom: 0}}>
          <HeaderOne withBorder>{'สมัครออดิชั่น'}</HeaderOne>
        </DefaultViewport>
        <AuditionMenu />
      </div>
    )
  }
}

const PROFILE_FRAGMENT = gql`
  fragment ProfileData on User {
    _id
    email
    mobileNo
    firstname
    lastname
  }
`

export default compose(
  withRequiredAuth('login'),
  withApollo,
  withProps(({ client, user }: { client: ApolloClient<any>; user: User }) => {
    return {
      onProfileChange: (key: string, value: string) => {
        const profileData = client.readFragment({
          fragment: PROFILE_FRAGMENT,
          id: 'User:' + user._id
        })
        profileData[key] = value
        client.writeFragment({
          fragment: PROFILE_FRAGMENT,
          id: 'User:' + user._id,
          data: profileData
        })
      }
    }
  }),
  graphql<{ me: User }>(
    gql`
      ${PROFILE_FRAGMENT}
      query {
        me {
          _id
          ...ProfileData
        }
      }
    `,
    {
      props: ({ data }) => ({
        me: data.me
      })
    }
  )
)(ProfilePage)
