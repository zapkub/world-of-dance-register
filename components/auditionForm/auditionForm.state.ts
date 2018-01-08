import { compose, withProps, withState, lifecycle } from 'recompose'
import gql from 'graphql-tag'
import { withApollo, graphql } from 'react-apollo'
import { ApolloClient } from 'apollo-client'

const uuid = require('uuid')

const MEMBER_TYPE_LIMIT = {
  upper: {
    min: 1,
    max: 4
  },
  team: {
    min: 5,
    max: 20
  },
  junior: {
    min: 1,
    max: 20
  }
}

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
    isConfirm
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
  isConfirm: false,
  __typename: 'AuditionInformation'
})
declare global {
  interface withAuditionFormStatePropTypes {
    onFormChange: (key: string, value: string) => void
    onMemberChange: (_id: string, key: string, value: string) => void
    onCreateNewMember: () => void
    saveForm?: () => void
    confirmSubmitForm: () => void
    auditionInfo: AuditionInformation
    isAcceptTerm: boolean
    setIsAcceptTerm: (value: boolean) => void
    minMember: number
    maxMember: number
    saving?: boolean
  }
}
export default compose<any, any>(
  withApollo,
  withState('isAcceptTerm', 'setIsAcceptTerm', false),
  withState('saving', 'setSaving', false),
  graphql<{ auditionInfo: AuditionInformation }, { client: any; url: any }>(
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
          reloadForm: data.refetch,
          loading: data.loading
        }
      },
      options: props => ({
        variables: {
          type: props.url.query.type
        },
        fetchPolicy: 'cache-and-network'
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
        maxMember: MEMBER_TYPE_LIMIT[type].max,
        minMember: MEMBER_TYPE_LIMIT[type].min,
        onCreateNewMember: () => {
          const data = getData()
          if (data.auditionInfo.members.length >= MEMBER_TYPE_LIMIT[type].max) {
            return
          } else {
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
            data.auditionInfo.members = members
            client.writeQuery({
              query: AUDITION_INFO_QUERY,
              variables: { type },
              data
            })
          }
        },
        onMemberChange: (_id: string, key: string, value: string) => {
          console.log(value)
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
  graphql<any, { auditionInfo: AuditionInformation, setSaving: (value: boolean) => void }>(AUDITION_INFO_MUTATION, {
    props: ({ mutate, ownProps }) => ({
      saveForm: async () => {
        /** save form without confirm */
        await mutate({
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
        console.log('save form complete...')
      },
      confirmSubmitForm: async () => {
        /** confirm submit with validation */
        ownProps.setSaving(true)
        await mutate({
          variables: {
            record: {
              ...ownProps.auditionInfo,
              isConfirm: true,
              members: ownProps.auditionInfo.members.map(member => ({
                ...member,
                __typename: undefined
              })),
              __typename: undefined,
              _id: undefined
            }
          }
        })
        ownProps.setSaving(false)
      }
    })
  }),
  lifecycle<{ auditionInfo: AuditionInformation, reloadForm: () => void }, any>({
    componentDidUpdate(prevProps) {
      if (this.props.auditionInfo.videoURL === 'PROCESSING') {
        console.log('refresh video status....')
        setTimeout(this.props.reloadForm, 5000) 
      }
    }
  })
)
