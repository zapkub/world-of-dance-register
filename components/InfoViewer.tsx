import * as React from 'react'
import { TextInputWithLabel } from './Input'
import thTh from '../i18n/th-th'
import { HeaderOne } from './Header'
import { DefaultViewport } from './Viewport';

export default (auditionInfo: AuditionInformation) => (
  <DefaultViewport>
    <HeaderOne withBorder>{'สมาชิก'}</HeaderOne>
    {auditionInfo.members.map(member => {
      const fields = Object.keys(member)
        .filter(key => key !== 'profileImageURL')
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
          {fields}
        </div>
      )
    })}

    <HeaderOne withBorder>{'รายละเอียดเพิ่มเติม'}</HeaderOne>
    {Object.keys(auditionInfo)
      .filter(key => key !== 'members')
      .map(key => (
        <div key={key}>
          <TextInputWithLabel
            label={thTh[key]}
            value={auditionInfo[key] || ''}
            onChange={() => {}}
          />
        </div>
      ))}
  </DefaultViewport>
)
