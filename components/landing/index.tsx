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
const LandingContainer = styled.div`
  background-image: url(/static/images/bg-pattern-repeat.png);
  color: #eee;
  p {
    color: #eee;
  }
  h1 {
    font-size: 2.4rem;
    color: white;
    font-weight: normal;
    font-family: 'Kanit', Thonburi, Arial;
  }
  .highlight {
    color: ${theme.blue};
  }
  .landing-button, .audition-menu__button {
    display: block;
    text-align: center;
    width: 100%;
    color: ${theme.dimBlue};
    border-color: ${theme.glowBlue};
    border-color: #fff;
    border-width: 2px;
    border-radius: 20px;
    background: #0f141a;
    padding: 13px 18px;
    &:hover {
      color: white;
      border-width: 2px;
      border-color: ${theme.glowBlue};
      background-color: rgba(0, 0, 0, 0);
      box-shadow: 1px 1px 35px ${theme.shadow};
    }
  }
`
const LandingPage = () => (
  <LandingContainer style={{ backgroundColor: '#000e19' }}>
    <div
      style={{ background: 'url(/static/images/bg-pattern-repeat.png) black' }}
    >
      <Welcome />
    </div>
    <AboutShow />
    <Process />
    <AuditionType />
    <Image
      src={'/static/images/decorate-footer.png'}
      srcHD={'/static/images/decorate-footer@2x.png'}
    />
  </LandingContainer>
)

export default compose(withSession)(LandingPage)
