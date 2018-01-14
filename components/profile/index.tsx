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
  auditionInfoList: {
    junior?: any
    junior_team?: any
    upper?: any
    upper_team?: any
    team?: any
  }
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
        <DefaultViewport style={{ paddingBottom: 0 }}>
          <HeaderOne withBorder>{'สมัครออดิชั่น'}</HeaderOne>
        </DefaultViewport>
        <AuditionMenu isConfirmList={this.props.auditionInfoList} />
        <ProfileInfoForm
          onChange={this.props.onProfileChange}
          {...this.props.me}
        />
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
  graphql<any>(
    gql`
      ${PROFILE_FRAGMENT}
      query {
        me {
          _id
          ...ProfileData
        }
        junior: auditionInfo(filter: { auditionType: junior }) {
          _id
        }

        junior_team: auditionInfo(filter: { auditionType: junior_team }) {
          _id
        }
        upper: auditionInfo(filter: { auditionType: upper }) {
          _id
        }
        upper_team: auditionInfo(filter: { auditionType: upper_team }) {
          _id
        }

        team: auditionInfo(filter: { auditionType: team }) {
          _id
        }
      }
    `,
    {
      options: props => ({
        fetchPolicy: 'cache-and-network'
      }),
      props: ({ data }) => ({
        me: data.me,
        auditionInfoList: {
          junior: !!data.junior,
          junior_team: !!data.junior_team,
          upper: !!data.upper,
          upper_team: !!data.upper_team,
          team: !!data.team
        }
      })
    }
  )
)(ProfilePage)
