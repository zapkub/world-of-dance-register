import * as React from 'react'
import { DefaultViewport } from '../../Viewport'
import AuditionMenu from '../../profile/components/AuditionMenu'
import { HeaderOne } from '../../Header'
import styled from 'styled-components'
import theme from '../../theme'
import { Image } from '../../Logo'
const AuditionTypeContainer = styled.div`
  position: relative;
  .audition-menu-description__wrapper {
    border-radius: 5px;
    border: 1px rgba(255,255,255,0.5) solid;
    padding: 13px 8px;
    margin: 8px 0 21px 0;
  }
  .audition-menu__container {
    font-size: 34px;
  }
  .audition-menu-description__wrapper {
    font-size: 1.2em;
  }
  .audition-menu__description {
    color: white;
    margin-top: 21px;
  }
  .audition-menu__button {
    line-height: 0.8;
    .sub-label {
      font-size: 0.8em;
    }
  }
  .audition-menu__item {
    padding: 0 13px;
    text-align: center;
  }
  .audition-menu__title {
    text-align: center;
  }
  .audition-menu__subtitle {
    color: white;
    font-size: 1.4em;
  }

  .audition-menu__title {
    text-align: center;
  }
  .age-label {
    color: ${theme.blue};
    font-size: 1em;
    font-weight: bold;
  }
  .member-amount-label {
    font-size: 1em;
    font-weight: 200;
    font-family: 'DB Helvethaica X';

    color: ${theme.blue};
  }
  .spray-left {
    position: absolute;
    left: 0;
    bottom: 0%;
  }
  .spray-right {
    position: absolute;
    right: 0;
    bottom: 0%;
  }
`
export default () => (
  <AuditionTypeContainer>
    <DefaultViewport style={{paddingTop: 21}} id="type-of-audition">
      <HeaderOne withLandingBorder center>
        {'ประเภทของ'}
        {'การสมัคร'}
      </HeaderOne>
      <AuditionMenu userExtraHead />
    </DefaultViewport>
    {/* <Image
      className="animated fadeIn spray-left"
      src={'/static/images/spray-left.png'}
      srcHD={'/static/images/spray-left@2x.png'}
    />
    <Image
      className="animated fadeIn spray-right"
      src={'/static/images/spray-right.png'}
      srcHD={'/static/images/spray-right@2x.png'}
    /> */}
  </AuditionTypeContainer>
)
