import * as React from 'react'
import { compose } from 'recompose'
import bp from 'styled-components-breakpoint'
import { Button } from '../../Button'
import theme from '../../theme'
import styled from 'styled-components'
import { LogoFull } from '../../Logo'
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
    .item {
      padding: ${21 / 2}px;
      flex: 0 0 50%;
      box-sizing: border-box;
    }
  }
  ${bp('mobile')`
    .landing-button-wrapper {
      display: block;
    }
    .landing-button {
      display: block;
      text-align: center;
      width: 100%;
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
      <Container id="landing-page-section">
        <LogoFull />
        <p
          className="logo-subtitle"
          style={{ textAlign: 'center' }}
          dangerouslySetInnerHTML={{
            __html: `
            The World's Greatest Dancers. <br />
            Judged by the best.
          `
          }}
        />
        <div className="landing-button-wrapper">
          {MenuListData.map((item, key) => (
            <div className='item'>
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
    )
  }
}
