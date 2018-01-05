import * as React from 'react'
import { TextInput } from '../../Input'
import { DefaultViewport } from '../../Viewport';

interface ProfileInfoFormPropTypes extends BasicProfile {
  onChange: (key: string, value: string) => void
}

const InputField = (props: {
  value: BasicProfile
  name: string
  onChange: any
}) => (
  <div>
    <TextInput
      value={props.value[props.name]}
      onChange={e => props.onChange(props.name, e.target.value)}
    />
  </div>
)
export default (props: React.DOMAttributes<any> & ProfileInfoFormPropTypes) => {
  console.log(props)
  return (
    <DefaultViewport>
      <InputField value={props} name={'email'} onChange={props.onChange} />
      <InputField value={props} name={'firstname'} onChange={props.onChange} />
      <InputField value={props} name={'lastname'} onChange={props.onChange} />
      <InputField value={props} name={'mobileNo'} onChange={props.onChange} />
    </DefaultViewport>
  )
}
