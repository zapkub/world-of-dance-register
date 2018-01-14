import * as React from 'react'
import withApolloClient from '../components/withData'
import { compose } from 'recompose'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Button } from '../components/Button'
import InfoViewer from '../components/InfoViewer';

const AUDITION_FORM_LIST_QUERY = gql`
query($id: MongoID!) {
  auditionInfoList(filter: {_id: $id}) {
    auditionType
    _id
    title
    description
    mobileNo
    dancingStyle
    coachName
    organizationName
    videoURL
    members {
      _id
      dateOfBirth
      email
      gender
      firstname
      lastname
      mobileNo
      nickname
      profileImageURL
    }
    ownerId
    isConfirm
    height
    weight
    nationality
    origin
    relationshipType
    educationBackground
    occupation
    address
    lineId
    instagramUrl
    facebookUrl
    emergencyContactName
    emergencyContactRelationAs
    emergencyContentMobileNo
    isAlreadyTrainByInstitutionName
    isAlreadyHasEntertainingProfile
  }
}
`
interface AdminPagePropTypes {
  user: User
  auditionInfoList: AuditionInformation[]
}
class AdminPage extends React.Component<AdminPagePropTypes, any> {
  render() {
    if (!this.props.user) {
      return (
        <form action="/login">
          <input name="username" placeholder="username" />
          <input name="password" placeholder="password" type="password" />
          <input type="submit" value="Login" />
        </form>
      )
    } else {
      return (
        <div>
          {this.props.auditionInfoList.map(info => (
            <InfoViewer key={info._id} {...info} />
          ))}
        </div>
      )
    }
  }
}

export default compose(
  withApolloClient,
  graphql<{ me: User }>(
    gql`
      query {
        me {
          _id
          email
        }
      }
    `,
    {
      props: ({ data }) => {
        return {
          user: data.me
        }
      }
    }
  ),
  graphql<any, any>(AUDITION_FORM_LIST_QUERY, {
    options: (props) => ({
      variables: {
        id: props.url.query.id
      }
    }),
    props : ({ data }) => {
      return {
        auditionInfoList: data.auditionInfoList || []
      }
    }
  }) 
)(AdminPage)
