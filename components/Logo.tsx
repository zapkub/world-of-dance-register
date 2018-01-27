import * as React from 'react'

import styled from 'styled-components'

const WOD_LOGO_URL = '/static/images/wod-logo.png'
const WOD_LOGO_URL_2X = '/static/images/wod-logo@2x.png'

export const WOD_FULL_LOGO_URL = '/static/images/wod-hero.png'
export const WOD_FULL_LOGO_URL_2X = '/static/images/wod-hero@2x.png'

export const ONE_HD_LOGO = '/static/images/one-hd-logo.png'
export const ONE_HD_LOGO_2X = '/static/images/one-hd-logo@2x.png'

const ONE_HD_LOGO_SMALL = '/static/images/one-hd-logo-small.png'
const ONE_HD_LOGO_SMALL_2X = '/static/images/one-hd-logo-small@2x.png'

export const LogoContainer = styled.div`
  display: inline-block;
  img {
    opacity: 0;
    width: 100%;
  }
  background-image: url(${(props: any) => props.src});
  background-repeat: no-repeat;
  background-size: contain;
  @media (min--moz-device-pixel-ratio: 1.5),
    (-o-min-device-pixel-ratio: 3/2),
    (-webkit-min-device-pixel-ratio: 1.5),
    (min-device-pixel-ratio: 1.5),
    (min-resolution: 1.5dppx) {
    background-image: url(${(props: any) => props.srcHD});
  }
` as any

export const Image = ( { className, style = {}, srcHD, src, disabledAutoSize }: { className?:any, src: string, srcHD: string, style?: any, disabledAutoSize?: boolean } ) => (
  <LogoContainer className={className} src={src} srcHD={srcHD}>
    {disabledAutoSize ? null : <img style={style} src={src} width={style.width} />}
  </LogoContainer>
)

export const Logo = props => (
  <LogoContainer src={WOD_LOGO_URL} srcHD={WOD_LOGO_URL_2X}>
    <img src={WOD_LOGO_URL} />
  </LogoContainer>
)

export const LogoFull = props => (
  <LogoContainer style={props.style} src={WOD_FULL_LOGO_URL} srcHD={WOD_FULL_LOGO_URL_2X}>
    <img src={WOD_FULL_LOGO_URL} />
  </LogoContainer>
)

export const LogoOneHd = ({ style = {} }: any) => (
  <LogoContainer style={style} src={ONE_HD_LOGO} srcHD={ONE_HD_LOGO_2X}>
    <img width={style.width} height={style.height} src={ONE_HD_LOGO} />
  </LogoContainer>
)

export const LogoOneHdSmall = ({ style = {} }: any) => (
  <LogoContainer
    style={style}
    src={ONE_HD_LOGO_SMALL}
    srcHD={ONE_HD_LOGO_SMALL_2X}
  >
    <img height={style.height} src={ONE_HD_LOGO_SMALL} />
  </LogoContainer>
)
