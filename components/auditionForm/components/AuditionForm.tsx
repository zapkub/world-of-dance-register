import * as React from 'react'
import { DefaultViewport } from '../../Viewport'
import { HeaderOne } from '../../Header'
import theme from '../../theme'
import styled from 'styled-components'
import th from '../../../i18n/th-th'
import * as moment from 'moment'
import singleAuditionProfileFields from '../../../api/AuditionInformation/singleAuditionProfileFields'
import {
  TextInput,
  TextInputMultipleLine,
  TextInputWithLabel,
  Checkbox,
  TextInputWrapper,
  TextInputLabel,
  DateInputWithLabel,
  SelectorInput,
  SelectorInputWithLabel
} from '../../Input'
import withVideoUpload from '../../withVideoUpload'
import VideoUpload from './VideoUpload'
import MemberItem from './MemberItem'
import { Button } from '../../Button'
import bp from 'styled-components-breakpoint'

const VideoUploadWithData = withVideoUpload((url, props) => {
  props.onChange(url)
})(VideoUpload)
const AuditionFormContainer = styled.div`
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
  .single-audition-profile-item {
  }
  .agreement-wrapper {
    border-top: 1px solid ${theme.blue};
    bottom: 0;
    margin-top: 21px;
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
  const VideoUpload = (
    <VideoUploadWithData
      onResetVideoURL={() => {
        const confirmRemove = confirm('ยืนยัน ต้องการล้างคลิปวีดีโอ ?')
        if (confirmRemove) {
          props.onResetVideoURL()
        }
      }}
      preUpload={props.saveForm}
      value={props.auditionInfo.videoURL}
      type={props.auditionInfo.auditionType}
      onChange={(url: any) => props.refreshVidStatus()}
    />
  )
  return (
    <AuditionFormContainer>
      <DefaultViewport style={{ paddingTop: 0 }}>
        <HeaderOne withBorder>
          {'สมัครออดิชั่นประเภท '}
          <span style={{ color: theme.blue }}>{props.url.query.type}</span>
        </HeaderOne>
        {!/(^junior$)|(^upper$)/.test(props.auditionInfo.auditionType) ? (
          <div>
            <TeamNameInput
              fluid
              value={props.auditionInfo.title}
              onChange={e => props.onFormChange('title', e.target.value)}
              placeholder="ชื่อทีม... ไม่เกิน 150 ตัวอักษร"
            />
            <HeaderOne withBorder>{'รายละเอียดทีม'}</HeaderOne>
            {['dancingStyle', 'coachName', 'mobileNo', 'organizationName'].map(
              name => (
                <TextInputWithLabel
                  label={th[name]}
                  onChange={e => props.onFormChange(name, e.target.value)}
                  key={name}
                  value={props.auditionInfo[name] || ''}
                />
              )
            )}
            <div className="video-upload-wrapper">
              <div className="item">{VideoUpload}</div>
              <div className="item">
                <TextInputMultipleLine
                  value={props.auditionInfo.description || ''}
                  onChange={e =>
                    props.onFormChange('description', e.target.value)
                  }
                  fluid
                  style={{ height: 220 }}
                  placeholder={'ประวัติของทีม หรือส่วนตัว...'}
                />
              </div>
            </div>
            <HeaderOne withBorder>{'สมาชิก'}</HeaderOne>
          </div>
        ) : (
          VideoUpload
        )}
        <div>
          {props.auditionInfo.members.map((member, index) => (
            <MemberItem
              isRemovable={index > props.minMember - 1}
              onRemove={props.onRemoveMember}
              onChange={props.onMemberChange}
              key={member._id + index}
              {...member}
              index={index}
              type={props.auditionInfo.auditionType}
            />
          ))}
          {props.maxMember === props.minMember ? null : (
            <Button
              style={{ marginTop: 34 }}
              onClick={props.onCreateNewMember}
              fluid
              disabled={isMemberFull}
            >
              {!isMemberFull
                ? '+ เพิ่มสมาชิกในทีม' +
                  `${props.auditionInfo.members.length}/${props.maxMember}`
                : 'สมาชิกครบแล้ว'}
            </Button>
          )}
        </div>
        {/(^junior$)|(^upper$)/.test(props.auditionInfo.auditionType)
          ? Object.keys(singleAuditionProfileFields).map((key, i) => {
              let type = 'text'
              switch (singleAuditionProfileFields[key].type) {
                case String:
                  type = 'text'
                  if (singleAuditionProfileFields[key].enum) {
                    return (
                      <div key={key} className="single-audition-profile-item">
                        <SelectorInputWithLabel
                          label={th[key]}
                          value={props.auditionInfo[key]}
                          onChange={value => props.onFormChange(key, value)}
                          options={singleAuditionProfileFields[key].enum.map(
                            choice => ({
                              label: th[choice],
                              value: choice
                            })
                          )}
                        />
                      </div>
                    )
                  }
                  break
                case Number:
                  type = 'number'
                  break
                case Date:
                  type = 'date'
                  return props.isMount ? (
                    <DateInputWithLabel
                      key={key}
                      label={'วันที่เกิด'}
                      selected={
                        props.auditionInfo[key]
                          ? moment(props.auditionInfo[key])
                          : moment()
                      }
                      onChange={value => props.onFormChange(key, value)}
                    />
                  ) : (
                    <div key={key} />
                  )
              }
              return (
                <div key={key} className="single-audition-profile-item">
                  <TextInputWithLabel
                    label={th[key] || key}
                    type={type}
                    placeholder={singleAuditionProfileFields[key].placeholder}
                    onChange={e => props.onFormChange(key, e.target.value)}
                    value={props.auditionInfo[key] || ''}
                  />
                </div>
              )
            })
          : null}
      </DefaultViewport>
      {!props.auditionInfo.isConfirm ? (
        <div className="agreement-wrapper">
          <div className="checkbox-agreement">
            <Checkbox
              checked={props.isAcceptTerm || props.auditionInfo.isConfirm}
              onClick={() => props.setIsAcceptTerm(!props.isAcceptTerm)}
            />
            <p
              style={{ color: theme.gray, display: 'inline-block' }}
              dangerouslySetInnerHTML={{
                __html: ` <b style='font-weight: bold'>ผู้สมัครรวมถึงครอบครัวและผู้ติดตามยินยอมให้บันทึกภาพ<br />โดยทางรายการจะเป็นผู้พิจารณาภาพที่นำไปออกอากาศทั้งหมด</b><br /> ข้าพเจ้าขอรับรองว่าข้อความข้างต้นเป็นความจริงทุกประการ `
              }}
            />
          </div>
          <Button
            loading={props.saving}
            disabled={!props.isAcceptTerm && !props.auditionInfo.isConfirm}
            onClick={props.confirmSubmitForm}
          >
            {'ส่งใบสมัคร'}
          </Button>
        </div>
      ) : (
        <div className="agreement-wrapper">
          <div className="checkbox-agreement">
            <p
              dangerouslySetInnerHTML={{
                __html: !props.saving
                  ? 'ใบสมัครนี้ถูกบันทึกเข้าระบบแล้ว'
                  : 'กำลังบันทึก'
              }}
            />
          </div>
          <Button
            loading={props.saving}
            disabled={props.saving}
            onClick={props.confirmSubmitForm}
          >
            {'บันทึกการแก้ไขใบสมัคร'}
          </Button>
        </div>
      )}
    </AuditionFormContainer>
  )
}
