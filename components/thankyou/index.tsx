import * as React from 'react'
import { compose } from 'recompose'
import withSession from '../../utils/withSession'

import Menubar from '../Menubar'
import { DefaultViewport } from '../Viewport'
import { HeaderOne, HeaderTwo } from '../Header'
import { Text } from '../Text';
import theme from '../theme';

const LandingPage = () => (
  <div>
    <Menubar noSticky noFixed />
    <DefaultViewport>
      <HeaderOne><span style={{color: theme.blue}}>{'ขอบคุณ'}</span></HeaderOne>
      <HeaderTwo>{'ยืนยันการส่งใบสมัครเรียบร้อยแล้ว !!'}</HeaderTwo>
      <Text dangerouslySetInnerHTML={{__html: `
        ทีมงานได้รับใบสมัครของคุณแล้ว <br />
        คุณสามารถกลับไปแก้ไขไปใบสมัครของคุณได้ที่หน้า สมัครออดิชั่น
      `}}/>
        
    </DefaultViewport>
  </div>
)

export default compose(withSession)(LandingPage)
