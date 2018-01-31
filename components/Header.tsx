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
export const withLandingBottomBorder = css`
  position: relative;
  margin-bottom: 45px;
  &:after {
    content: " ";
    position: absolute;
    width: 50%;
    min-width: 250px;
    height: 30px;
    left: 50%;
    bottom: -50px;
    transform:translate(-50%, 0);
    background-repeat: no-repeat;
    background-size: contain;
    background-image: url("/static/images/landing-header-underline.png");
    @media (min--moz-device-pixel-ratio: 1.5),
      (-o-min-device-pixel-ratio: 3/2),
      (-webkit-min-device-pixel-ratio: 1.5),
      (min-device-pixel-ratio: 1.5),
      (min-resolution: 1.5dppx) {
      background-image: url("/static/images/landing-header-underline@2x.png");
    }
  }
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
  withLandingBorder?: boolean
}
export const HeaderOne: React.SFC<HeaderPropTypes> = styled.h1`
  ${HeaderRoot}
  font-size: 2.5em;
  margin: 21px 0px;
  ${(props: HeaderPropTypes ) => props.withBorder ? withBottomBorder : ''}
  ${(props: HeaderPropTypes ) => props.withLandingBorder ? withLandingBottomBorder : ''}
  ${(props: HeaderPropTypes ) => props.center ? center : ''}
` as any

export const HeaderTwo: React.SFC<HeaderPropTypes> = styled.h1`
  ${HeaderRoot}
  font-size: 1.725em;
  margin: 13px 0px;
  ${(props: HeaderPropTypes ) => props.withBorder ? withBottomBorder : ''}
  ${(props: HeaderPropTypes ) => props.withLandingBorder ? withLandingBottomBorder : ''}
  ${(props: HeaderPropTypes ) => props.center ? center : ''}
` as any
