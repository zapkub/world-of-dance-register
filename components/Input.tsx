import styled, { css } from 'styled-components'
import * as React from 'react'
import theme from './theme';

const RootInput = css`
  border: 1px solid ${theme.borderGray};
  font-size: 1.14285rem;
  padding: 13px 8px;
`

export const TextInput = styled.input`
  ${RootInput}
`