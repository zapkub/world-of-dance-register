import * as React from 'react'
import { compose } from 'recompose'
import withSession from '../../utils/withSession'
import Welcome from './components/Welcome'
import AboutShow from './components/AboutShow'
import Menubar from '../Menubar'
import AuditionType from './components/AuditionType'
import Process from './components/Process'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import theme from '../theme'
import { Image } from '../Logo'
import { withLandingBottomBorder, HeaderRoot } from '../Header';
const LandingContainer = styled.div`
  background-position-y: 300px;
  background-image: url(/static/images/bg-large@2x.jpg);
  font-family: 'DB Helvethaica X Reg', Thonburi, Arial;
  background-size: contain;
  color: #eee;
  font-size: 24px;
  -webkit-font-smoothing: antialiased;
  .text-element {
    color: white;
    font-family: 'DB Helvethaica X Reg', Thonburi, Arial;
  }
  ${breakpoint('mobile')`
    font-size: 20px;
  `}
  ${breakpoint('tablet')`
    font-size: 24px;
  `}
  p {
    color: #eee;
  }
  h1 {
    ${HeaderRoot};
    font-weight: normal;
    font-family: 'PSL NatrinthornExtra Pro', Thonburi, Arial;
    text-align: center;
    margin: 34px auto;
    font-weight: normal;
    color: white;
    ${withLandingBottomBorder};
    ${breakpoint('mobile')`
      font-size: 38px;
    `}
    ${breakpoint('tablet')`
      font-size: 55px;
    `}
  }
  h2 {
    color: ${theme.blue};
    text-align:center;
    ${breakpoint('mobile')`
      font-size: 38px;
    `}
    ${breakpoint('tablet')`
      font-size: 55px;
    `}
    font-family: 'DB Helvethaica X Med', Thonburi, Arial;
    line-height: 1.5em;
    color: #41c5f6;
  }
  .highlight {
    color: ${theme.blue};
  }
  .landing-button,
  .audition-menu__button {
    display: block;
    text-align: center;
    color: ${theme.dimBlue};
    border-color: ${theme.glowBlue};
    border-color: #fff;
    border-width: 2px;
    border-radius: 18px;
    font-family: 'PSL NatrinthornExtra Pro', Thonburi, Arial;
    background: #0f141a;
    padding: 13px 18px;
    font-weight: normal;
    &:hover {
      color: white;
      border-width: 2px;
      border-color: ${theme.glowBlue};
      background-color: rgba(0, 0, 0, 0);
      box-shadow: 1px 1px 35px ${theme.shadow};
    }
    ${breakpoint('mobile')`
      max-width: 300px;
      font-size:28px;
    `}
    ${breakpoint('tablet')`
      width: 100%;
      font-size:32px;
    `}
  }
  .hero {
    background-image: url(/static/images/hero-bg@2x.jpg);
    background-size: contain;
    background-repeat: no-repeat;
    position: relative;
    .wrapper {
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
   
  }
  .content {
    background-size: contain;
  }
`
const LandingPage = () => (
  <LandingContainer style={{ backgroundColor: '#000e19' }}>
    <div className="hero">
      <div className="wrapper">
        <Welcome />
      </div>
    </div>
    <div className="content">
      <AboutShow />
      <Process />
      <AuditionType />
      <Image
        src={'/static/images/decorate-footer.png'}
        srcHD={'/static/images/decorate-footer@2x.png'}
      />
    </div>
  </LandingContainer>
)

export default compose(withSession)(LandingPage)
