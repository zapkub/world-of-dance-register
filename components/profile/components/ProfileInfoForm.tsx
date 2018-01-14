import * as React from 'react'
import { TextInput } from '../../Input'
import { DefaultViewport } from '../../Viewport'
import { HeaderOne } from '../../Header'
import { Button } from '../../Button'
import th from '../../../i18n/th-th'
import styled from 'styled-components'
import bp from 'styled-components-breakpoint'

interface ProfileInfoFormPropTypes extends BasicProfile {
  onChange: (key: string, value: string) => void
}

export const InputField = (props: {
  value: BasicProfile
  name: string
  onChange: any
}) => (
  <div>
    {th[props.name]}
    <TextInput
      style={{ margin: '13px 0' }}
      fluid
      value={props.value[props.name] || ''}
      onChange={e => props.onChange(props.name, e.target.value)}
    />
  </div>
)

const FormContainer = styled.div`
  max-width: 640px;
  ${bp('mobile')`
    .profile-info__button {
      width: 100%;
      box-sizing: border-box;
      margin: 3px 0;
    }
  `}
  ${bp('tablet')`
    .profile-info__button {
      width: auto;
      margin: inherit;
    }
  `}
`

export default (props: ProfileInfoFormPropTypes) => {
  return (
    <DefaultViewport style={{paddingTop: 0}}>
      <HeaderOne withBorder>{'บัญชีของฉัน'}</HeaderOne>
      <FormContainer>
        <InputField value={props} name={'email'} onChange={props.onChange} />
        <InputField
          value={props}
          name={'firstname'}
          onChange={props.onChange}
        />
        <InputField value={props} name={'lastname'} onChange={props.onChange} />
        <InputField value={props} name={'mobileNo'} onChange={props.onChange} />
        <Button className='profile-info__button' style={{marginRight: 8}}>{'บันทึก'}</Button>
        <a href="/logout">
          <Button className='profile-info__button'>{'ออกจากระบบ'}</Button>
        </a>
      </FormContainer>
    </DefaultViewport>
  )
}
