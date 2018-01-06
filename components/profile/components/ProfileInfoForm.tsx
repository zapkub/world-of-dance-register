import * as React from 'react'
import { TextInput } from '../../Input'
import { DefaultViewport } from '../../Viewport'
import { HeaderOne } from '../../Header'
import { Button } from '../../Button'
import styled from 'styled-components'

interface ProfileInfoFormPropTypes extends BasicProfile {
  onChange: (key: string, value: string) => void
}

export const InputField = (props: {
  value: BasicProfile
  name: string
  onChange: any
}) => (
  <div>
    {props.name}
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
`

export default (props: ProfileInfoFormPropTypes) => {
  return (
    <DefaultViewport>
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
        <Button>{'บันทึก'}</Button>
      </FormContainer>
    </DefaultViewport>
  )
}
