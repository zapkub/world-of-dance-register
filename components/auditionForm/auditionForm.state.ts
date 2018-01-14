import { compose, withProps, withState, lifecycle } from 'recompose'
import gql from 'graphql-tag'
import { withApollo, graphql } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import validator from '../../api/AuditionInformation/validator'
import singleAuditionProfileFields from '../../api/AuditionInformation/singleAuditionProfileFields'
import routes from '../../routes'
import {
  defaultFormInfo,
  MEMBER_TYPE_LIMIT
} from '../../api/AuditionInformation/generateDefault'
export { MEMBER_TYPE_LIMIT }
const objectPath = require('object-path')
const debounce = require('debounce')

const uuid = require('uuid')

export const VIDEO_URL_QUERY = gql`
  query($type: EnumAuditionInformationAuditionType!) {
    auditionInfo(filter: { auditionType: $type }) {
      _id
      videoURL
    }
  }
`
export const AUDITION_INFO_FRAGMENT = gql`
  fragment AuditionData on AuditionInformation {
    _id
    auditionType
    title
    description
    coachName
    mobileNo
    dancingStyle
    isConfirm
    organizationName

    ${Object.keys(singleAuditionProfileFields).map(key => `${key} `)}
  }
`
export const MEMBER_INFO_FRAGMENT = gql`
  fragment MembersData on AuditionInformationMembers {
    email
    firstname
    nickname
    lastname
    mobileNo
    profileImageURL
    _id
    dateOfBirth
    gender
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

declare global {
  interface withAuditionFormStatePropTypes {
    onFormChange: (key: string, value: string) => void
    onMemberChange: (_id: string, key: string, value: string) => void
    onCreateNewMember: () => void
    onRemoveMember: () => void
    onResetVideoURL?: () => void
    saveForm?: () => void
    confirmSubmitForm: () => void
    auditionInfo: AuditionInformation
    isAcceptTerm: boolean
    setIsAcceptTerm: (value: boolean) => void
    minMember: number
    maxMember: number
    isDirty: boolean
    setIsDirty: (value) => void
    saving?: boolean
    isMount?: boolean
    refreshVidStatus: () => void
  }
}
export default compose<any, any>(
  withApollo,
  withProps((props: { client: ApolloClient<any>; url: any }) => ({
    saveForm: debounce(async () => {
      const result = await props.client.readQuery<{
        auditionInfo: AuditionInformation
      }>({
        query: AUDITION_INFO_QUERY,
        variables: {
          type: props.url.query.type
        }
      })
      if (result.auditionInfo.isConfirm) {
        return
      }
      /** save form without confirm */
      await props.client.mutate({
        mutation: AUDITION_INFO_MUTATION,
        variables: {
          record: {
            ...result.auditionInfo,
            members: result.auditionInfo.members.map(member => ({
              ...member,
              __typename: undefined
            })),
            __typename: undefined,
            _id: undefined
          }
        }
      })
    }, 2000),
    refreshVidStatus: debounce(async () => {
      console.log('refresh video status....')
      const result = await props.client.readQuery<{ auditionInfo: any }>({
        query: AUDITION_INFO_QUERY,
        variables: {
          type: props.url.query.type
        }
      })
      await props.client.mutate({
        mutation: AUDITION_INFO_MUTATION,
        variables: {
          record: {
            ...result.auditionInfo,
            members: result.auditionInfo.members.map(member => ({
              ...member,
              __typename: undefined
            })),
            __typename: undefined,
            _id: undefined
          }
        }
      })
    }, 1000)
  })),
  withState('isAcceptTerm', 'setIsAcceptTerm', false),
  withState('saving', 'setSaving', false),
  withState('isMount', 'setIsMount', false),
  withState('isDirty', 'setIsDirty', false),
  graphql<{ auditionInfo: AuditionInformation }, { client: any; url: any }>(
    AUDITION_INFO_QUERY,
    {
      props: ({ data, ownProps }) => {
        console.log('form refetch...')
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
          reloadForm: async () => {
            const result = await data.refetch()
            return result
          },
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

  /**
   * Check status of video after uploading
   * polling at 5000ms for updating UI
   */
  graphql<
    { auditionInfo: AuditionInformation },
    { reloadForm: () => void; auditionInfo: AuditionInformation; url: any }
  >(VIDEO_URL_QUERY, {
    options: props => {
      return {
        variables: {
          type: props.url.query.type
        },
        fetchPolicy: 'network-only'
      }
    },
    props: ({ data, ownProps }) => {
      const vidURL = objectPath.get(data, 'auditionInfo.videoURL', undefined)
      return {
        auditionInfo: {
          ...ownProps.auditionInfo,
          videoURL: vidURL
        },
        refreshVidStatus: async () => {
          await ownProps.reloadForm()
          console.log('reload video status')
          await data.refetch()
        }
      }
    }
  }),
  graphql<any, any>(VIDEO_URL_QUERY, {
    props: ({}) => ({}),
    options: props => {
      const vidURL = objectPath.get(props, 'auditionInfo.videoURL', undefined)
      return {
        variables: {
          type: props.url.query.type
        },
        pollInterval: vidURL === 'PROCESSING' ? 5000 : undefined,
        fetchPolicy: 'network-only'
      }
    }
  }),
  withProps(
    (props: {
      client: ApolloClient<any>
      url: any
      auditionInfo: AuditionInformation
      setIsDirty: (value: boolean) => boolean
      saveForm: () => void
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
          props.setIsDirty(true)
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
                dateOfBirth: new Date(),
                gender: 'male',
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
          props.saveForm()
        },
        onRemoveMember: (_id: string) => {
          const isConfirm = confirm('ยืนยันลบสมาชิกในทีม')
          if (!isConfirm) {
            return
          }
          props.setIsDirty(true)
          const data = getData()
          let members = data.auditionInfo.members.filter(
            member => member._id !== _id
          )
          data.auditionInfo.members = members
          client.writeQuery({
            query: AUDITION_INFO_QUERY,
            variables: { type },
            data
          })
        },
        onMemberChange: (_id: string, key: string, value: string) => {
          props.setIsDirty(true)
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
          props.saveForm()
        },
        onFormChange: (key: string, value: string | number) => {
          console.log('onChange: ', key, value)
          props.setIsDirty(true)
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
          props.saveForm()
        }
      }
    }
  ),
  graphql<
    any,
    {
      auditionInfo: AuditionInformation
      setIsDirty: (value) => void
      setSaving: (value: boolean) => void
      client: ApolloClient<any>
      url: any
    }
  >(AUDITION_INFO_MUTATION, {
    props: ({ mutate, ownProps }) => ({
      onResetVideoURL: async () => {
        // const { type } = ownProps.url.query
        // ownProps.client.writeQuery({
        //   query: AUDITION_INFO_QUERY,
        //   variables: {
        //     type: type
        //   },
        //   data: {
        //     auditionInfo: {
        //       ...ownProps.auditionInfo,
        //       videoURL: null
        //     }
        //   }
        // })

        await mutate({
          variables: {
            record: {
              ...ownProps.auditionInfo,
              members: ownProps.auditionInfo.members.map(member => ({
                ...member,
                __typename: undefined
              })),
              videoURL: undefined,
              __typename: undefined,
              _id: undefined
            }
          }
        })
      },

      confirmSubmitForm: async () => {
        /** confirm submit with validation */
        const isConfirm = confirm('ยืนยันการส่งใบสมัคร')
        if (!isConfirm) {
          return
        }
        ownProps.setSaving(true)
        try {
          validator(ownProps.auditionInfo)
          await mutate({
            variables: {
              record: {
                ...ownProps.auditionInfo,
                isConfirm: true,
                videoURL: undefined,
                members: ownProps.auditionInfo.members.map(member => ({
                  ...member,
                  __typename: undefined
                })),
                __typename: undefined,
                _id: undefined
              }
            }
          })
          routes.Router.pushRoute('thankyou')
        } catch (e) {
          if (e.name === 'validate-error') {
            alert(e.message)
          } else {
            console.error(e)
          }
        }
        ownProps.setSaving(false)
        ownProps.setIsDirty(false)
      }
    })
  }),
  lifecycle<
    {
      auditionInfo: AuditionInformation
      setIsMount: (value) => void
      refreshVidStatus: () => void
    },
    any
  >({
    componentDidMount() {
      this.props.setIsMount(true)
    },
    componentDidUpdate(prevProps) {
      if (this.props.auditionInfo.videoURL === 'PROCESSING') {
        // console.log('try to reload')
        // this.props.refreshVidStatus()
      }
    }
  })
)
