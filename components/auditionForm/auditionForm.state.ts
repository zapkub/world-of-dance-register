import { compose, withProps } from 'recompose'
import gql from 'graphql-tag'
import uuid from 'uuid'
import { withApollo, graphql } from 'react-apollo'
import { ApolloClient } from 'apollo-client'

export const AUDITION_INFO_FRAGMENT = gql`
  fragment AuditionData on AuditionInformation {
    _id
    auditionType
    videoURL
    title
    description
    coachName
    mobileNo
    dancingStyle
    organizationName
  }
`
export const MEMBER_INFO_FRAGMENT = gql`
  fragment MembersData on AuditionInformationMembers {
    firstname
    nickname
    lastname
    mobileNo
    profileImageURL
    _id
    age
  }
`
export const AUDITION_INFO_MUTATION = gql`
  ${AUDITION_INFO_FRAGMENT}
  mutation($record: UpdateOneAuditionInformationInput!) {
    updateAuditionInfo(record: $record) {
      recordId
      record {
        _id
        ...AuditionData
      }
    }
  }
`

export const AUDITION_INFO_QUERY = gql`
  ${AUDITION_INFO_FRAGMENT}
  ${MEMBER_INFO_FRAGMENT}
  query($type: EnumAuditionInformationAuditionType!) {
    auditionInfo(filter: { auditionType: $type }) {
      _id
      ...AuditionData 
      members {
        ...MembersData
      }
    }
  }
`

export const defaultFormInfo = (
  type?: AuditionEnumType
): AuditionInformation & { __typename: string } => ({
  _id: 'client-state-form-' + type,
  members: [
    {
      _id: 'default',
      firstname: '',
      lastname: '',
      mobileNo: '',
      age: null,
      nickname: '',
      profileImageURL: '',
      __typename: 'AuditionInformationMembers'
    }
  ],
  title: '',
  description: '',
  videoURL: '',
  coachName: '',
  mobileNo: '',
  dancingStyle: '',
  organizationName: '',
  auditionType: type,
  __typename: 'AuditionInformation'
})
declare global {
  interface withAuditionFormStatePropTypes {
    onFormChange: (key: string, value: string) => void
    onMemberChange: (_id: string, key: string, value: string) => void
    confirmSubmitForm: () => void
    auditionInfo: AuditionInformation
  }
}
export default compose<any, any>(
  withApollo,
  graphql<{ auditionInfo: AuditionInformation }, { client:any, url: any }>(
    AUDITION_INFO_QUERY,
    {
      props: ({ data, ownProps }) => {
        if (!data.auditionInfo) {
          /** init default data */
          const result = ownProps.client.writeQuery({
            query: AUDITION_INFO_QUERY,
            variables: {
              type: ownProps.url.query.type
            },
            data: {
              auditionInfo: defaultFormInfo(ownProps.url.query.type)
            }
          })
        }

        return {
          auditionInfo:
            data.auditionInfo || defaultFormInfo(ownProps.url.query.type),
          loading: data.loading
        }
      },
      options: props => ({
        variables: {
          type: props.url.query.type
        }
      })
    }
  ),
  withProps(
    (props: {
      client: ApolloClient<any>
      url: any
      auditionInfo: AuditionInformation
    }) => {
      const { client } = props
      /**
       * Client side fragment update
       */
      const type = props.url.query.type
      const getData = () => {
        let data = client.readQuery<{ auditionInfo: AuditionInformation }>({
          query: AUDITION_INFO_QUERY,
          variables: {
            type
          }
        })
        return data
      }
      return {
        onCreateNewMember: () => {
          const data = getData()
          const members = [
            ...data.auditionInfo.members,
            {
              _id: uuid(),
              email: '',
              firstname: '',
              lastname: '',
              mobileNo: '',
              age: null,
              nickname: '',
              profileImageURL: '',
              __typename: 'AuditionInformationMembers'
            }
          ]
        },
        onMemberChange: (_id: string, key: string, value: string) => {
          const data = getData()
          const members = data.auditionInfo.members.map(member => {
            if (member._id === _id) {
              member[key] = value
            }
            return member
          })

          data.auditionInfo.members = members
          client.writeQuery({
            query: AUDITION_INFO_QUERY,
            variables: {
              type
            },
            data
          })
        },
        onFormChange: (key: string, value: string | number) => {
          const data = getData()
          let auditionInfo = data.auditionInfo
          if (!auditionInfo) {
            /** write default if fragment data not exists */
            auditionInfo = defaultFormInfo(type)
          }
          client.writeQuery({
            query: AUDITION_INFO_QUERY,
            variables: {
              type: type
            },
            data: {
              auditionInfo: {
                ...auditionInfo,
                [key]: value
              }
            }
          })
        }
      }
    }
  ),
  graphql<any, { auditionInfo: AuditionInformation }>(AUDITION_INFO_MUTATION, {
    props: ({ mutate, ownProps }) => ({
      confirmSubmitForm: () => {
        mutate({
          variables: {
            record: {
              ...ownProps.auditionInfo,
              members: ownProps.auditionInfo.members.map(member => ({
                ...member,
                __typename: undefined
              })),
              __typename: undefined,
              _id: undefined
            }
          }
        })
      }
    })
  }),
)
