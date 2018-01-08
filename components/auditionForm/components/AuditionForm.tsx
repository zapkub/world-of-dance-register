import * as React from 'react'
import { DefaultViewport } from '../../Viewport'
import { HeaderOne } from '../../Header'
import theme from '../../theme'
import styled from 'styled-components'
import th from '../../../i18n/th-th'
import {
  TextInput,
  TextInputMultipleLine,
  TextInputWithLabel,
  Checkbox
} from '../../Input'
import withVideoUpload from '../../withVideoUpload'
import VideoUpload from './VideoUpload'
import MemberItem from './MemberItem'
import { Button } from '../../Button'
import bp from 'styled-components-breakpoint'

const VideoUploadWithData = withVideoUpload((url, props) => {
  console.log(url)
  props.onChange(url)
})(VideoUpload)
const AuditionFormContainer = styled(DefaultViewport)`
  padding-top: 13px;
  .video-upload-wrapper {
    margin: 21px 0;
    display: flex;
    ${bp('mobile')`
      flex-direction: column;
      .item {
        flex: 1 1 50%;
        padding: 13px 8px;
      }
    `} ${bp('tablet')`
      flex-direction: row;
      .item {
        padding: 0 8px;
        &:first-child {
          padding-left: 0;
        }
        &:last-child {
          padding-right: 0;
        }
      }
    `};
  }
  .agreement-wrapper {
    border-top: 1px solid ${theme.blue};
    position: fixed;
    bottom: 0;
    width: 100%;
    left: 0;
    right: 0;
    padding: 8px 0;
    background: white;
    display: flex;
    justify-content: center;
    p {
      margin: 0 13px;
      line-height: 1.71em;
    }
    .checkbox-agreement {
      display: flex;
      align-items: center;
    }
    ${bp('mobile')`
      flex-direction: column;
      padding: 8px 13px;
      box-sizing: border-box;
    `} ${bp('tablet')`
      flex-direction:row;
    `};
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
  const isMemberFull = props.maxMember === props.auditionInfo.members.length
  console.log(props.auditionInfo)
  return (
    <AuditionFormContainer>
      <HeaderOne withBorder>
        {'สมัครออดิชั่นประเภท '}
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
          <VideoUploadWithData
            onResetVideoURL={() => {
              const confirmRemove = confirm('ยืนยัน ต้องการล้างคลิปวีดีโอ ?')
              if (confirmRemove) {
                props.onFormChange('videoURL', null)
              }
            }}
            preUpload={props.saveForm}
            value={props.auditionInfo.videoURL}
            type={props.auditionInfo.auditionType}
            onChange={(url: any) => props.onFormChange('videoURL', url)}
          />
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
        <HeaderOne withBorder>{'รายละเอียด'}</HeaderOne>
        {['dancingStyle', 'coachName', 'mobileNo', 'organizationName'].map(
          name => (
            <TextInputWithLabel
              label={th[name]}
              onChange={e => props.onFormChange(name, e.target.value)}
              key={name}
              value={props.auditionInfo[name]}
            />
          )
        )}
      </div>

      <HeaderOne withBorder>{'สมาชิก'}</HeaderOne>
      <div>
        {props.auditionInfo.members.map((member, index) => (
          <MemberItem
            onChange={props.onMemberChange}
            key={member._id}
            {...member}
            index={index}
            type={props.auditionInfo.auditionType}
          />
        ))}
        <Button onClick={props.onCreateNewMember} fluid disabled={isMemberFull}>
          {!isMemberFull
            ? '+ เพิ่มสมาชิกในทีม' +
              `${props.auditionInfo.members.length}/${props.maxMember}`
            : 'สมาชิกครบแล้ว'}
        </Button>
      </div>

      <div className="agreement-wrapper">
        <div className="checkbox-agreement">
          <Checkbox
            checked={props.isAcceptTerm || props.auditionInfo.isConfirm}
            onClick={() => props.setIsAcceptTerm(!props.isAcceptTerm)}
          />
          <p
            style={{ color: theme.gray, display: 'inline-block' }}
            dangerouslySetInnerHTML={{
              __html: `
            ข้าพเจ้าได้อ่านและยอมรับ <a href='#'>ข้อตกลงการเข้าสมัคร</a><br />และ <a href='#'>เงื่อนไขการออดิชั่น</a> เป็นที่เรียบร้อยแล้ว
          `
            }}
          />
        </div>
        <Button
          loading={props.saving}
          disabled={!props.isAcceptTerm && !props.auditionInfo.isConfirm}
          onClick={props.confirmSubmitForm}
        >
          {!props.auditionInfo.isConfirm ? 'ยืนยันส่งใบสมัคร' : 'อัพเดทข้อมูล'}
        </Button>
      </div>
    </AuditionFormContainer>
  )
}
