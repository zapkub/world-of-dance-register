import * as React from 'react'
import { compose } from 'recompose'
import { Button } from '../../Button'
import theme from '../../theme'
import styled from 'styled-components'
import { LogoFull } from '../../Logo'
import MenuListData from './MenuListData'

const LANDING_PAGE_MIN_HEIGHT = 480

const LandingButton = styled(Button)`
  flex: 1 1 auto;
  min-width: 0;
  white-space: pre;
  margin: ${21 / 2}px;
`
const Container = styled.div`
  height: 100vh;
  min-height: ${LANDING_PAGE_MIN_HEIGHT}px;
  display: flex;
  justify-content: center;
  align-items: center;
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
    width: 640px;
  }
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
            <LandingButton key={key}>{item.label}</LandingButton>
          ))}
        </div>
      </Container>
    )
  }
}
