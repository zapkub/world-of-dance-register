import styled, { css } from 'styled-components'
import * as React from 'react'
import theme from './theme';

const TextRoot = css`
  color: ${theme.text};
  font-weight: 200;
  line-height: 1.3;
  font-family: Helvetica, Arial;
`

export const TextLabel = styled.div`
  ${TextRoot}
  color: ${theme.gray};
  font-size: 1.1rem;
  line-height: 1.71em;
`

const TextElement = styled.div`
  ${TextRoot}
`

export const Text:any = (props: any) => {
  return <TextElement {...props} className={`${props.className} text-element`} />
}

