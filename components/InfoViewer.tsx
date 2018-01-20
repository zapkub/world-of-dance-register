import * as React from 'react'
import { TextInputWithLabel, DateInputWithLabel } from './Input'
import thTh from '../i18n/th-th'
import { HeaderOne } from './Header'
import * as moment from 'moment'
import { DefaultViewport } from './Viewport'
import styled from 'styled-components'
import { Button } from './Button'

const Viewport = styled(DefaultViewport)`
  input {
    pointer-events: none;
    cursor: not-allowed;
    color: #555;
  }
`

export default (auditionInfo: AuditionInformation) => (
  <Viewport>
    <a href={auditionInfo.videoURL}>
      <Button>{'ดูคลิป video'}</Button>
    </a>
    <br />
    <HeaderOne withBorder>{'สมาชิก'}</HeaderOne>
    {auditionInfo.members.map(member => {
      const fields = Object.keys(member)
        .filter(key => key !== '__typename')
        .filter(key => key !== '_id')
        .filter(key => key !== '__v')
        .filter(key => key !== 'dateOfBirth')
        .map(key => {
          return (
            <div key={key}>
              <TextInputWithLabel
                key={key}
                label={thTh[key]}
                value={member[key] || ''}
                onChange={() => {}}
              />
            </div>
          )
        })
      return (
        <div key={member._id}>
          <img width="200" src={member['profileImageURL']} />
          <DateInputWithLabel
            selected={moment(member['dateOfBirth'])}
            onChange={() => {}}
            label="วันเกิด"
          />
          {fields}
        </div>
      )
    })}

    <HeaderOne withBorder>{'รายละเอียดเพิ่มเติม'}</HeaderOne>
    {Object.keys(auditionInfo)
      .filter(key => key !== 'members')
      .filter(key => key !== '__typename')
      .filter(key => key !== '__v')
      .filter(key => key !== '_id')
      .filter(key => key !== 'ownerId')
      .filter(key => key !== 'isConfirm')
      .map(key => (
        <div key={key} data-name={key}>
          <TextInputWithLabel
            label={thTh[key]}
            value={auditionInfo[key] || ''}
            onChange={() => {}}
          />
        </div>
      ))}
  </Viewport>
)
