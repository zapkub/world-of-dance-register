import * as React from 'react'
import { compose } from 'recompose'
import bp from 'styled-components-breakpoint'
import { Button } from '../../Button'
import theme from '../../theme'
import styled from 'styled-components'
import { LogoFull, LogoOneHd, Image, WOD_FULL_LOGO_URL, WOD_FULL_LOGO_URL_2X } from '../../Logo'
import MenuListData from './MenuListData'
import { DefaultViewport } from '../../Viewport'
import routes from '../../../routes'
import Link from 'next/link'

const LANDING_PAGE_MIN_HEIGHT = 480

const LandingButton = styled(Button)`
  min-width: 0;
  white-space: pre;
`
const Container = styled(DefaultViewport)`
  padding-top: 0;
  height: 100vh;
  min-height: ${LANDING_PAGE_MIN_HEIGHT}px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .logo-subtitle {
    font-family: 'WOD', 'Kanit', sans-serif;
    font-size: 24px;
    line-height: 40px;
    color: ${theme.gray};
    margin: 34px 0;
    font-weight: bold;
  }
  .landing-button-wrapper {
    display: flex;
    flex-wrap: wrap;
    max-width: 640px;
    animation-delay: 2.5s;
    .item {
      padding: ${21 / 2}px;
      flex: 0 1 50%;
      box-sizing: border-box;
    }
  }
  .logo {
    height: 200px;
    width: 100%;
    flex: 0 1 200px;
    background-position: center;
    animation-delay: 1.2s;
  }
  .tagline {
    animation-delay: 2.0s;
    width: 100%;
    height: 220px;
    background-position: center;
    flex: 0 2 220px;
  }
  ${bp('mobile')`
    .landing-button-wrapper {
      display: block;
    }
    .landing-button {
      display: block;
      text-align: center;
      width: 100%;
      color: ${theme.glowBlue}; 
      border-color: ${theme.glowBlue};
      border-image: linear-gradient(to bottom right,${theme.darkblue},${theme.glowBlue}) 1;
      border-width: 1px;

      &:hover {
        color: white;
        border-width: 2px;
        border-color: ${theme.glowBlue};
        background-color: rgba(0,0,0,0);
        box-shadow: 1px 1px 35px ${theme.shadow};
      }
    }
  `} ${bp('tablet')`
    .landing-button-wrapper {
      display: flex;
    }
    .landing-button {
      text-align: center;
    }
  `};
`

export default class LandingPage extends React.Component {
  render() {
    return (
      <div style={{ backgroundColor: 'black' }}>
        <Container id="landing-page-section" className="animated fadeInDown">
          <LogoOneHd style={{ zIndex: 1 }} />
          {/* <p
            className="logo-subtitle"
            style={{ textAlign: 'center', color: 'white', zIndex: 1 }}
            dangerouslySetInnerHTML={{
              __html: `
            The World's Greatest Dancers. <br />
            Judged by the best.
          `
            }}
          /> */}
          <Image 
            disabledAutoSize
            className='logo animated fadeIn'
            src={WOD_FULL_LOGO_URL}
            srcHD={WOD_FULL_LOGO_URL_2X}
          />
          <Image
            className="tagline animated fadeIn"
            disabledAutoSize
            src={'/static/images/wod-tagline.jpg'}
            srcHD={'/static/images/wod-tagline@2x.jpg'}
          />
          <div className="landing-button-wrapper animated fadeIn">
            {MenuListData.map((item, key) => (
              <div className="item" key={key}>
                {item.id === 'audition' ? (
                  <routes.Link key={item.id} route="profile">
                    <LandingButton fluid className="landing-button" key={key}>
                      {item.label}
                    </LandingButton>
                  </routes.Link>
                ) : (
                  <Link key={item.id} href={`/#${item.id}`}>
                    <LandingButton fluid className="landing-button" key={key}>
                      {item.label}
                    </LandingButton>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </Container>
      </div>
    )
  }
}
