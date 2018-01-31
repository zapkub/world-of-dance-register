import * as React from 'react'
import theme from '../../theme'
import styled from 'styled-components'
import { Text } from '../../Text'
import { DefaultViewport } from '../../Viewport'
import {
  withBottomBorder,
  HeaderRoot,
  withLandingBottomBorder
} from '../../Header'
import bp from 'styled-components-breakpoint'
import { Image } from '../../Logo'

const ABOUT_SHOW_MIN_HEIGHT = 480
const Background = styled.div`
  position:relative;
  .decorate-left {
    position: absolute;
    left: 0;
    top: 50%;

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
    ${bp('mobile')`
      display:none;
    `};
    ${bp('desktop')`
      display: block;
    `};
  }
`
const Container = styled.div`
  height: auto;
  text-align: center;
  position: relative;
  z-index: 2;
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.1;
    background-position: center;
  }
  .content-wrapper {
  }
  .content-text {
    flex: 1 0 auto;
    max-width: 50%;
    text-align: left;
  }
  .tagline {
    flex: 1 2 auto;
    height: 200px;
    background-position: center center;
  }
`

// background-color: ${theme.blackBlue};
const AboutShowTitleHeader = styled.div`
 
  .about-header__show {
    padding-left: ${38 + 21}px;
  }

`
const AboutShowText = styled(Text)`
  color: ${theme.matteWhite};
  margin: 21px 0;
  font-size: 1.2em;
  .highlight {
    color: #41c5f6;
    font-weight: bold;
  }

  h2.sub-head {
    color: ${theme.blue};
    font-family: 'DB Helvethaica X Med', Thonburi, Arial;
    line-height: 1.5em;
    color: #41c5f6;
  }
`

const PARAGRAPH_1 = `<h2 class='sub-head'> ครั้งแรกในเมืองไทย กับรายการแข่งขันเต้นระดับเวิร์ลคลาส!</h2> `
const PARAGRAPH_2 = `
<span style='font-weight:bold'>WORLD OF DANCE (WOD)</span> รายการประกวดเต้นอันดับหนึ่งจากสหรัฐอเมริกา ที่สร้างชื่อจาก Judge ขาแด๊นซ์ระดับโลก<br/>
อย่าง Jennifer Lopez / NE-YO / Derek Hough / Jenna Dewan Tatum กำลังจะมาเขย่าฟลอร์ถึงเมืองไทยแล้ว!
<br />
นำทีมโดยกรรมการสายแดนซ์ระดับแถวหน้าของเมืองไทยอย่าง <span style='font-weight:bold'>โจ้ สุธีศักดิ์ , หญิง รฐา และ ฮั่น อิสริยะ</span> 
<br />

เฟ้นหาสุดยอดนักเต้น จากทั่วทุกมุมของประเทศ มาระเบิดศักยภาพบนเวทีให้ถึงขีดสุด แบบไม่จำกัดสไตล์! ไม่จำกัดเพศ!
<br />
เพื่อสร้างอลังการงานโชว์ที่สมบูรณ์แบบที่สุด ในการชิงตำแหน่ง “สุดยอดนักเต้นอันดับหนึ่งของเมืองไทย” พิชิตเงินรางวัล 1 ล้านบาท! 
<br />
<span class='highlight'>เตรียมหัวใจไว้สั่นสะเทือนกับ “ WORLD OF DANCE THAILAND“   กรกฎาคมนี้ ได้ทาง ช่องone 31  </span>
`
const PARAGRAPH_3 = ``

export default class AboutShow extends React.Component {
  render() {
    return (
      <Background>
        <Container id="about-show">
          <DefaultViewport style={{paddingTop: 0}} className="content-wrapper">
            <AboutShowTitleHeader>
              <h1 className="about-header__about">{'เกี่ยวกับรายการ'}</h1>
            </AboutShowTitleHeader>
            <div>
              <AboutShowText
                className="highlight"
                dangerouslySetInnerHTML={{ __html: PARAGRAPH_1 }}
              />
              <AboutShowText
                dangerouslySetInnerHTML={{ __html: PARAGRAPH_2 }}
              />
              <AboutShowText
                dangerouslySetInnerHTML={{ __html: PARAGRAPH_3 }}
              />
            </div>
          </DefaultViewport>
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
        /> */}
      </Background>
    )
  }
}
