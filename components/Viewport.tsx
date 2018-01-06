import styled from 'styled-components'
import { MENUBAR_HEIGHT, VIEWPORT_MAX_WIDTH } from './theme';




export const DefaultViewport = styled.div`
  padding: ${MENUBAR_HEIGHT + 38}px 0;
  max-width:${VIEWPORT_MAX_WIDTH}px;
  margin:0 auto;
`