import styled, { css } from 'styled-components'
import * as React from 'react'
import theme from './theme'

const ButtonRoot = css`
  font-family: 'WOD', 'Kanit', sans-serif;
  font-weight: 500;
  padding: 0px 21px;
  height: 48px;
  border: none;
  min-width: 250px;
  font-size: 14px;
`

const FacebookButtonComponent = styled.button`
  ${ButtonRoot};
  background-color: #3c5193;
  color: white;
  height: 50px;
  padding: 0 38px;
  border-radius: 8px;
  font-family: 'WOD', 'Thonburi', 'Tahoma', sans-serif;
  font-size: 1.285em;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`
export const FacebookButton = (props: React.ButtonHTMLAttributes<{}>) => (
  <FacebookButtonComponent>{props.children}</FacebookButtonComponent>
)

export const Button = styled.button`
  ${ButtonRoot} border: 2px solid ${theme.blue};
  color: ${theme.blue};
  background: none;
  font-size: 1.428em;
  &:hover {
    background-color: ${theme.blue};
    color: white;
  }
`