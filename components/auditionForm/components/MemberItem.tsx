import * as React from 'react'
import * as moment from 'moment'
import {
  TextInputWithLabel,
  SelectorInput,
  SelectorInputWithLabel,
  DateInputWithLabel
} from '../../Input'
import th from '../../../i18n/th-th'
import { HeaderTwo } from '../../Header'
import styled from 'styled-components'
import * as AvatarEditor from 'react-avatar-editor'

import theme from '../../theme'
import { UploadButton, Button } from '../../Button'
import { Text } from '../../Text'
import bp from 'styled-components-breakpoint'
import { members } from '../../../api/AuditionInformation/auditionInfoFields'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .avatar-upload__button-wrap {
    display: flex;
  }
`
const AvatarUploaderContainer = styled.div`
  background-color: ${theme.blue};
  border: 1px solid ${theme.blue};
  position: relative;
  color: white;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  input {
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    position: absolute;
    cursor: pointer;
    opacity: 0;
  }
`
const AvatarButton = styled(Button)`
  font-size: 1rem;
  display: inline-block;
  padding: 5px 13px;
  min-width: 80px;
  margin: 0 3px;
`
const RemoveMember = styled.div`
  font-size: 1rem;
  color: ${theme.blue};
  display: inline-block;
  margin-left: 8px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`
class AvatarUploader extends React.Component<
  {
    type: string
    index: number
    onChange: (url: string) => void
    value: string
  },
  { file: File; scale: any; result: string; loading?: boolean }
> {
  input: any
  editor: any
  constructor(props) {
    super(props)
    this.state = {
      file: undefined,
      scale: 1,
      result: props.value,
      loading: false
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({
        result: this.props.value
      })
    }
  }
  setFiles(files: any) {
    if (files[0].size > 2000000) {
      alert('File is too big!')
      this.input.value = ''
    } else {
      this.setState({
        file: files[0]
      })
    }
  }
  confirm() {
    this.setState({
      loading: true
    })
    if (this.editor) {
      const canvas = this.editor.getImageScaledToCanvas()
      /**
       * start upload image to server
       */
      const setImage = imageUrl => {
        this.setState({
          result: imageUrl,
          loading: false
        })
        this.props.onChange(imageUrl)
      }
      canvas.toBlob(
        blob => {
          const formData = new FormData()
          formData.append('image', blob)
          var xhr = new XMLHttpRequest()
          xhr.open(
            'post',
            `/upload-image/member/${this.props.type}/${this.props.index}`,
            true
          )

          xhr.upload.onprogress = function(e) {
            if (e.lengthComputable) {
              var percentage = e.loaded / e.total * 100
              console.log(percentage)
            }
          }

          xhr.onerror = function(e) {
            console.info(
              'An error occurred while submitting the form. Maybe your file is too big'
            )
          }

          xhr.onload = function() {
            console.log(this.statusText)
            const result = JSON.parse(this.responseText)
            setImage(result.url)
          }

          xhr.send(formData)
        },
        'image/jpeg',
        0.95
      )
    }
  }
  clear() {
    this.setState({ result: null, file: null })
    this.props.onChange(null)
  }
  render() {
    if (this.state.result) {
      return (
        <Container style={{ width: 300, textAlign: 'center' }}>
          <AvatarUploaderContainer>
            <img src={this.state.result} style={{ width: 250 }} />
          </AvatarUploaderContainer>
          <div className="avatar-upload__button-wrap" style={{ marginTop: 8 }}>
            <AvatarButton onClick={this.clear.bind(this)}>
              {'ล้างรูปภาพ'}
            </AvatarButton>
          </div>
        </Container>
      )
    }
    return (
      <Container style={{ width: 300, textAlign: 'center' }}>
        <AvatarUploaderContainer>
          {this.state.file ? (
            <div>
              <AvatarEditor
                style={{ width: 250, height: 250 }}
                ref={ref => (this.editor = ref)}
                scale={this.state.scale}
                width={1024}
                height={1024}
                image={this.state.file}
              />
            </div>
          ) : (
            <div>
              <p
                dangerouslySetInnerHTML={{
                  __html: `อัพโหลดรูปภาพ<br/>ขนาดไม่เกิน 2MB`
                }}
              />
              <input
                type="file"
                ref={ref => (this.input = ref)}
                accept="image/jpeg"
                name="vid"
                onChange={e => this.setFiles(e.target.files)}
              />
            </div>
          )}
        </AvatarUploaderContainer>
        {this.state.file && !this.state.loading ? (
          <div style={{ marginTop: 8 }}>
            <Text dangerouslySetInnerHTML={{ __html: `ลากเพื่อปรับขนาดภาพ` }} />
            <input
              style={{ marginTop: 3 }}
              type="range"
              min="1"
              max="8"
              step="0.1"
              value={this.state.scale}
              onChange={e => this.setState({ scale: Number(e.target.value) })}
            />
            <div className="avatar-upload__button-wrap">
              <AvatarButton onClick={this.clear.bind(this)}>
                {'ล้างรูปภาพ'}
              </AvatarButton>
              <AvatarButton onClick={this.confirm.bind(this)}>
                {'อัพโหลดรูปภาพ'}
              </AvatarButton>
            </div>
          </div>
        ) : (
          <div style={{ marginTop: 8 }}>
            {this.state.loading ? 'กำลังอัพโหลด...' : ''}
          </div>
        )}
      </Container>
    )
  }
}

interface MemberItemPropTypes extends Member {
  index: number
  type: string
  isRemovable?: boolean
  onChange: (_id: string, key: string, value: string) => void
  onRemove?: (_id: string) => void
}
const InputFields = ['mobileNo', 'firstname', 'lastname', 'email', 'age']
const MemberItemContainer = styled.div`
  display: flex;
  margin: 8px 0;
  ${bp('mobile')`
    flex-direction: column;
    align-items: center;
  `} ${bp('tablet')`
    flex-direction: row;
  `};
`
const MemberItem: React.SFC<MemberItemPropTypes> = (
  props: MemberItemPropTypes
) => {
  return (
    <div>
      <HeaderTwo>
        {'สมาชิกคนที่ ' + (props.index + 1)}{' '}
        {props.isRemovable ? (
          <RemoveMember onClick={() => props.onRemove(props._id)}>
            {'ลบ'}
          </RemoveMember>
        ) : (
          ''
        )}
      </HeaderTwo>
      <MemberItemContainer>
        <div className="member-item__input">
          <DateInputWithLabel 
            label={th['dateOfBirth']}
            onChange={e => props.onChange(props._id, 'dateOfBirth', e)}
            selected={moment(props['dateOfBirth']) || moment()}
          />
          {Object.keys(members)
            .filter(key => members[key].isForm)
            .filter(key => members[key].type !== Date)
            .map(
              name =>
                !members[name].enum ? (
                  <TextInputWithLabel
                    key={name}
                    type={members[name].type === String ? 'text' : 'number'}
                    label={th[name]}
                    placeholder={members[name].placeholder}
                    onChange={e =>
                      props.onChange(props._id, name, e.target.value)
                    }
                    value={props[name] || ''}
                  />
                ) : (
                  <SelectorInputWithLabel
                    onChange={value => props.onChange(props._id, name, value)}
                    key={name}
                    label={th[name]}
                    value={props[name]}
                    options={members[name].enum.map(item => ({
                      label: th[item],
                      value: item
                    }))}
                  />
                )
            )}
        </div>
        <AvatarUploader
          index={props.index}
          type={props.type}
          value={props.profileImageURL}
          onChange={url => props.onChange(props._id, 'profileImageURL', url)}
        />
      </MemberItemContainer>
    </div>
  )
}
MemberItem.displayName = 'MemberItem'
export default MemberItem
