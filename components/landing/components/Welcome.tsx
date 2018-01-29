import * as React from 'react'
import { compose } from 'recompose'
import bp from 'styled-components-breakpoint'
import { Button } from '../../Button'
import theme from '../../theme'
import styled from 'styled-components'
import {
  LogoFull,
  LogoOneHd,
  Image,
  WOD_FULL_LOGO_URL,
  WOD_FULL_LOGO_URL_2X
} from '../../Logo'
import MenuListData from './MenuListData'
import { DefaultViewport } from '../../Viewport'
import routes from '../../../routes'
import Link from 'next/link'

const LANDING_PAGE_MIN_HEIGHT = 480

const LandingButton = styled(Button)`
  min-width: 0;
  white-space: pre;
`
const Background = styled.div`
  position: relative;
  /* background-image: url('/static/images/hero-background@2x.png'); */
  background-size: cover;
  background-position: top center;
  background-repeat: no-repeat;
  
  .decorate-left {
    position: absolute;
    left: 0;
    top: 50%;
    z-index: 2;
    transform: translateY(-50%);
    ${bp('mobile')`
      display:none;
    `};
    ${bp('desktop')`
      display: block;
    `};
  }
  .decorate-right {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
    ${bp('mobile')`
      display:none;
    `};
    ${bp('desktop')`
      display: block;
    `};
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
const Container = styled(DefaultViewport)`
  padding-top: 51px;
  overflow: hidden;
  height: auto;
  min-height: ${LANDING_PAGE_MIN_HEIGHT}px;
  display: flex;
  align-items: center;
  position: relative;
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
    max-width: 800px;
    animation-delay: 2.5s;
    .item {
      padding: ${21 / 2}px;
      flex: 0 1 50%;
      box-sizing: border-box;
    }
  }
  .logo {
    height: auto;
    flex: 0 1 auto;
    background-position: center;
    animation-delay: 1.2s;
    ${bp('mobile')`
      width: 640px;
      margin-top: -21px;
    `};
    ${bp('desktop')`
      margin-top: -61px;
      width: 100%;
    `};
  }
  .tagline {
    margin-top: -141px;
    animation-delay: 2s;
    width: 820px;
    background-position: center;
    flex: 0 2 auto;
    ${bp('mobile')`
      width: 480px;
      margin-top: -81px;
    `};
    ${bp('desktop')`
      width: 870px;
    `};
  }
  .text {
    color: white;
    font-family: 'PSL NatrinthornExtra Pro', 'Kanit', sans-serif;
    font-size: 48px;
    text-align: center;
    h1 {
      font-family: 'PSL NatrinthornExtra Pro', 'Kanit', sans-serif;
      font-size: 72px;
      margin: 21px 0;
    }
    .highlight-text {
      color: ${theme.blue};
      font-size: 64px;
    }
  }
  ${bp('mobile')`
    .landing-button-wrapper {
      display: block;
    }
  `};
  ${bp('tablet')`
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
      <Background>
        <Container id="landing-page-section" className="">
          <Image
            style={{marginTop: 50}}
            className="logo animated "
            src={'/static/images/wod-judge-top.png'}
            srcHD={'/static/images/wod-judge-top@2x.png'}
          />
          {/* <LogoOneHd style={{ zIndex: 1 }} /> */}
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
          {/* <Image
            className="logo animated "
            src={WOD_FULL_LOGO_URL}
            srcHD={WOD_FULL_LOGO_URL_2X}
          />
          <Image
            className="tagline animated "
            src={'/static/images/wod-judge.png'}
            srcHD={'/static/images/wod-judge@2x.png'}
          />

        <Image
          className="animated"
          src={'/static/images/recuit-tag.png'}
          srcHD={'/static/images/recuit-tag@2x.png'}
        />
          <div
            className="text"
            dangerouslySetInnerHTML={{
              __html: `
              <span class='highlight-text'>นักเต้นสายแดนซ์</span> ทุกประเภท<br/>
              เพื่อร่วมรายการ<span class='highlight-text'>แข่งขันเต้นระดับโลก</span><br />
              <h1>ชิงเงินรางวัล</h1>
            `
            }}
          />

          <Image
            style={{ marginBottom: 45, position: 'relative', maxWidth: 800 }}
            src={'/static/images/prize-pool.png'}
            srcHD={'/static/images/prize-pool@2x.png'}
          />
           */}

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

        {/* <Image
          className="animated fadeIn decorate-right"
          src={'/static/images/decorate-right-top.png'}
          srcHD={'/static/images/decorate-right-top@2x.png'}
        />
        <Image
          className="animated fadeIn decorate-left"
          src={'/static/images/decorate-left-top.png'}
          srcHD={'/static/images/decorate-left-top@2x.png'}
        />
        <Image
          className="animated fadeIn spray-left"
          src={'/static/images/spray-left.png'}
          srcHD={'/static/images/spray-left@2x.png'}
        />
        <Image
          className="animated fadeIn spray-right"
          src={'/static/images/spray-right.png'}
          srcHD={'/static/images/spray-right@2x.png'}
        /> */}
      </Background>
    )
  }
}
