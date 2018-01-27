import styled, { css } from 'styled-components'
import * as React from 'react'
import theme from './theme';

const TextRoot = css`
  line-height: 1.71em;
  color: ${theme.text};
  font-weight: 200;
`

export const TextLabel = styled.div`
  ${TextRoot}
  color: ${theme.gray};
  font-size: 1.1rem;
  line-height: 1.71em;
`

export const Text = styled.div`
  ${TextRoot}
`
