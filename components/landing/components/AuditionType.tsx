import * as React from 'react'
import { DefaultViewport } from '../../Viewport'
import AuditionMenu from '../../profile/components/AuditionMenu'
import { HeaderOne } from '../../Header';
import theme from '../../theme';

export default () => (
  <DefaultViewport id='type-of-audition'>
    <HeaderOne withBorder center >
      {'ประเภทของ '}<span style={{color: theme.blue}}>{'การสมัคร'}</span>
    </HeaderOne>
    <AuditionMenu />
  </DefaultViewport>
)
