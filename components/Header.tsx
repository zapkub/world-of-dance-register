import styled, { css } from 'styled-components'
import * as React from 'react'
import theme from './theme';
export const HeaderRoot = css`
  color: ${theme.text};
  font-weight: 500;
  position: relative;
  font-family: 'Kanit', 'Thonburi', 'Tahoma', sans-serif;
`
const center = css`
  text-align: center;
`

export const withBottomBorder = css`
  display: inline-block;
  padding-bottom: 34px;
  &:after {
    background-color: ${theme.blue};
    height: 2px;
    content: ' ';
    width: 70%;
    position: absolute;
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
  }

`

interface HeaderPropTypes {
  withBorder?: boolean
  center?: boolean
}
export const HeaderOne: React.SFC<HeaderPropTypes> = styled.h1`
  ${HeaderRoot}
  font-size: 2.5em;
  margin: 21px 0px;
  ${(props: HeaderPropTypes ) => props.withBorder ? withBottomBorder : ''}
  ${(props: HeaderPropTypes ) => props.center ? center : ''}
` as any
