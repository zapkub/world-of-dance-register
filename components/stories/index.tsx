import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Button, FacebookButton } from '../Button'
import { TextInput } from '../Input'
import { HeaderOne } from '../Header'
import { Text } from '../Text'
import { Logo, LogoFull, LogoOneHd } from '../Logo'

storiesOf('Common', module)
  .add('Logo', () => (<Logo />))
  .add('Logofull', () => (<LogoFull />))
  .add('LogoOneHd', () => (<LogoOneHd />))
  .add('Header', () => {
    return <HeaderOne>{'หัวเรื่องแรก'}</HeaderOne>
  })
  .add('with border', () => {
    return <HeaderOne withBorder>{'หัวเรื่องแรก'}</HeaderOne>
  })
.add('root', () => (
  <Text>
    {'เนื้อหาบางอย่างที่ยาวมาก ยาวไปจ้า อยาววววววไปร้โย่ว'} <br />{' '}
    {'ยาวสัดยาวกว่าเดิมยาวเลย'}
  </Text>
))
  .add('Text input', () => (<TextInput placeholder='ใส่บางอย่าง' />))
  .add('with text', () => (
    <Button onClick={action('clicked')}>{'ปุ่มทั่วไป'}</Button>
  ))
  .add('fb button', () => (
    <FacebookButton onClick={action('clicked')}>
      {'สมัครออดิชั่นด้วยบัญชี Facebook'}
    </FacebookButton>
  ))
