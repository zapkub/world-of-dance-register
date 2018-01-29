import * as React from 'react'
import { compose } from 'recompose'
import withSession from '../../utils/withSession'
import Welcome from './components/Welcome'
import AboutShow from './components/AboutShow'
import Menubar from '../Menubar'
import AuditionType from './components/AuditionType'
import Process from './components/Process'
import styled from 'styled-components'
import theme from '../theme'
import { Image } from '../Logo'
import { withLandingBottomBorder, HeaderRoot } from '../Header';
const LandingContainer = styled.div`
  background-position-y: 300px;
  background-image: url(/static/images/bg-large@2x.jpg);
  font-family: 'DB Helvethaica X', Thonburi, Arial;
  background-size: contain;
  color: #eee;
  font-size: 24px;
  -webkit-font-smoothing: antialiased;
  .text-element {
    color: white;
    font-family: 'DB Helvethaica X', Thonburi, Arial;
  }
  p {
    color: #eee;
  }
  h1 {
    ${HeaderRoot};
    font-size: 55px;
    font-weight: normal;
    font-family: 'PSL NatrinthornExtra Pro', Thonburi, Arial;
    text-align: center;
    margin: 34px auto;
    font-weight: normal;
    color: white;
    ${withLandingBottomBorder};
  }
  h2 {
    color: ${theme.blue};
    text-align:center;
    font-size: 55px;
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
    width: 100%;
    color: ${theme.dimBlue};
    border-color: ${theme.glowBlue};
    border-color: #fff;
    border-width: 2px;
    border-radius: 20px;
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
