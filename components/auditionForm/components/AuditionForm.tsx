import * as React from 'react'
import { DefaultViewport } from '../../Viewport'
import { HeaderOne } from '../../Header'
import theme from '../../theme'
import styled from 'styled-components'
import { TextInput, TextInputMultipleLine } from '../../Input'
import withVideoUpload from '../../withVideoUpload'
import VideoUpload from './VideoUpload'
import MemberItem from './MemberItem'
import { Button } from '../../Button'

const VideoUploadWithData = withVideoUpload(VideoUpload)
const AuditionFormContainer = styled(DefaultViewport)`
  .video-upload-wrapper {
    margin: 21px 0;
    display: flex;
    .item {
      flex: 1 1 auto;
      padding: 0 8px;
      &:first-child {
        padding-left: 0;
      }
      &:last-child {
        padding-right: 0;
      }
    }
  }
`
const TeamNameInput = styled(TextInput)`
  font-size: 1.8rem;
`
const FormContainer = styled.div`
  max-width: 640px;
`

interface AuditionFormPropTypes
  extends WithVideoUploadPropType,
    withAuditionFormStatePropTypes {
  url: {
    query: {
      type: string
    }
  }
}
export default (props: AuditionFormPropTypes) => {
  return (
    <AuditionFormContainer>
      <HeaderOne withBorder>
        {'สมัครออดิชั่นแบบ'}
        <span style={{ color: theme.blue }}>{props.url.query.type}</span>
      </HeaderOne>
      <TeamNameInput
        fluid
        value={props.auditionInfo.title}
        onChange={e => props.onFormChange('title', e.target.value)}
        placeholder="ชื่อทีม... ไม่เกิน 150 ตัวอักษร"
      />
      <div className="video-upload-wrapper">
        <div className="item">
          <VideoUploadWithData />
        </div>
        <div className="item">
          <TextInputMultipleLine
            value={props.auditionInfo.description}
            onChange={e => props.onFormChange('description', e.target.value)}
            fluid
            style={{ height: 220 }}
            placeholder={'ประวัติของทีม...'}
          />
        </div>
      </div>
      <div>
        {['dancingStyle', 'coachName', 'mobileNo', 'organizationName'].map(
          name => (
            <div key={name}>
              {name}
              <TextInput
                onChange={e => props.onFormChange(name, e.target.value)}
                value={props.auditionInfo[name]}
              />
            </div>
          )
        )}
      </div>

      <div>
        {props.auditionInfo.members.map((member, index) => (
          <MemberItem
            onChange={props.onMemberChange}
            key={member._id}
            {...member}
            index={index}
          />
        ))}
      </div>

      <Button onClick={props.confirmSubmitForm}>{'ยืนยันส่งใบสมัคร'}</Button>
    </AuditionFormContainer>
  )
}
