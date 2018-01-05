import * as React from 'react'

import styled from 'styled-components'
import { DefaultViewport } from '../../Viewport'
import { HeaderOne } from '../../Header'
import Menubar from '../../Menubar'
import { FacebookButton } from '../../Button'
import { Text, TextLabel } from '../../Text'

const LoginLabel = styled(TextLabel)`
  margin: 21px 0;
`

export default () => (
  <div>
    <Menubar noSticky />
    <DefaultViewport>
      <HeaderOne withBorder>{'สมัครออดิชั่น'}</HeaderOne>
      <div>
        <LoginLabel>
          {'เราจะขอข้อมูลบัญชี Facebook เพื่อใช้ในขั้นตอนการสมัคร'}
        </LoginLabel>
        <a href="/facebook">
          <FacebookButton>{'สมัครออดิชั่นด้วยบัญชี Facebook'}</FacebookButton>
        </a>

        <LoginLabel>{'มีปัญหาเกี่ยวกับการสมัคร ?'}</LoginLabel>
      </div>
    </DefaultViewport>
  </div>
)
