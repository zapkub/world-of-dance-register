import * as React from 'react'
import { TextInputWithLabel } from '../../Input'

interface MemberItemPropTypes extends Member {
  index: number
  onChange: (_id: string, key: string, value: string) => void
}
const InputFields = ['mobileNo', 'firstname', 'lastname', 'email', 'age']
const MemberItem: React.SFC<MemberItemPropTypes> = (props: MemberItemPropTypes) => {
  return (
    <div>
      {'สมาชิกคนที่ ' + props.index}
      {props._id}
      {InputFields.map(name => (
        <TextInputWithLabel
          key={name}
          label={name}
          onChange={e => props.onChange(props._id, name, e.target.value)}
          value={props[name] || ''}
        />
      ))}
    </div>
  )
}
MemberItem.displayName = 'MemberItem'
export default MemberItem