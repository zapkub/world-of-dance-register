import styled from 'styled-components'
import { MENUBAR_HEIGHT, VIEWPORT_MAX_WIDTH } from './theme';
import bp from 'styled-components-breakpoint'



export const DefaultViewport = styled.div`
  max-width:${VIEWPORT_MAX_WIDTH}px;
  margin:0 auto;

  ${bp('mobile')`
    padding: ${MENUBAR_HEIGHT + 48}px 8px 21px 8px;
  `}
  ${bp('tablet')`
    padding: ${MENUBAR_HEIGHT + 48}px 8px 21px 8px;
  `}

  ${bp('desktop')`
    padding: ${MENUBAR_HEIGHT + 48}px 8px 21px 8px;
  `}
`