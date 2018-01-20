import * as React from 'react'
import theme from '../../theme'
import styled from 'styled-components'
import { Text } from '../../Text'
import { DefaultViewport } from '../../Viewport'
import { withBottomBorder, HeaderRoot } from '../../Header'
import { Image } from '../../Logo'

const ABOUT_SHOW_MIN_HEIGHT = 480

const Container = styled.div`
  height: auto;
  min-height: 100vh;
  background-color: black;
  text-align: center;
  position: relative;
  .bg {
    position: absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    opacity: 0.1;
    background-image: url(/static/images/wod-bg.jpg);
    background-position: center;
  }
  .content-wrapper {
  }
  .content-text{
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
  margin: 34px auto;
  ${withBottomBorder};
  ${HeaderRoot};
  font-weight: 800;
  color: white;
  font-size: 50px;
  .about-header__show {
    color: ${theme.glowBlue};
    padding-left: ${38 + 21}px;
    text-shadow: 0px 1px 10px ${theme.shadow};
  }
`
const AboutShowText = styled(Text)`
  color: ${theme.matteWhite};
  margin: 21px 0;
  font-size: 1.1428rem;
  .highlight {
    color: ${theme.glowBlue};
    font-weight: bold;
  }
`

const PARAGRAPH_1 = ` “ครั้งแรกในประเทศไทยกับการแข่งขันที่ยิ่งใหญ่  และมีดีกรีความร้อนแรงที่สุด” `
const PARAGRAPH_2 = `
<b style="font-weight:bold;">World Of Dance</b>  เป็นรายการค้นหานักเต้น และ 
ผู้ที่มีใจรักในการเต้นจากทั่วประเทศ มาแสดงศักยภาพของตัวเอง โดยไม่จำกัดสไตล์ 
สามารถผสมผสานการเต้นหลากหลายรูปแบบ สร้างความแตกต่าง โชว์ความสร้างสรรค์
 เพื่อชิงตำแหน่ง <br /><span class='highlight'>“สุดยอดนักเต้นอันดับหนึ่งของเมืองไทย”</span> <br />  พร้อมพิชิตเงินรางวัล 1 ล้านบาท 
`
const PARAGRAPH_3 = `ติดตามความยิ่งใหญ่ของรายการระดับโลก ได้ที่ ช่อง one 31 เดือนมิถุนายน`

export default class AboutShow extends React.Component {
  render() {
    return (
      <Container id="about-show">
        <div className='bg' />
        <DefaultViewport className="content-wrapper">
            <AboutShowTitleHeader>
              <div className="about-header__about">{'เกี่ยวกับ'}</div>
              <div className="about-header__show">{'รายการ'}</div>
            </AboutShowTitleHeader>
            <div>
              <AboutShowText
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
    )
  }
}
