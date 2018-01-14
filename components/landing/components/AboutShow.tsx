import * as React from 'react'
import theme from '../../theme'
import styled from 'styled-components'
import { Text } from '../../Text'
import { DefaultViewport } from '../../Viewport'
import { withBottomBorder, HeaderRoot } from '../../Header';

const ABOUT_SHOW_MIN_HEIGHT = 480

const Container = styled.div`
  min-height: ${ABOUT_SHOW_MIN_HEIGHT}px;
  height: 100vh;
  background-color: ${theme.blackBlue};
`

const AboutShowTitleHeader = styled.div`
  margin: 34px 0;
  ${withBottomBorder}
  ${HeaderRoot}
  font-weight: 800;
  color: white;
  font-size: 50px;
  .about-header__show {
    color: ${theme.blue};
    padding-left: ${38 + 21}px;
  }

`
const AboutShowText = styled(Text)`
  color: ${theme.textWithDarkenBG};
  margin: 21px 0;
  font-size: 1.1428rem;
  .highlight {
    color: ${theme.blue};
  }
`

const PARAGRAPH_1 = ` “ครั้งแรกในประเทศไทยกับการแข่งขันที่ยิ่งใหญ่  และมีดีกรีความร้อนแรงที่สุด” `
const PARAGRAPH_2 = `
World of dance  เป็นรายการค้นหานักเต้น และ 
ผู้ที่มีใจรักในการเต้นจากทั่วประเทศ มาแสดงศักยภาพของตัวเอง โดยไม่จำกัดสไตล์ 
สามารถผสมผสานการเต้นหลากหลายรูปแบบ สร้างความแตกต่าง โชว์ความสร้างสรรค์
 เพื่อชิงตำแหน่ง <span class='highlight'>“สุดยอดนักเต้นอันดับหนึ่งของเมืองไทย”</span>   พร้อมพิชิตเงินรางวัล 1 ล้านบาท 
`
const PARAGRAPH_3 = `ติดตามความยิ่งใหญ่ของรายการระดับโลก ได้ที่ ช่อง one 31 เดือนมิถุนายน`

export default class AboutShow extends React.Component {
  render() {
    return (
      <Container id='about-show'>
        <DefaultViewport>
          <AboutShowTitleHeader >
            <div className='about-header__about'>{'เกี่ยวกับ'}</div>
            <div className='about-header__show'>{'รายการ'}</div>
          </AboutShowTitleHeader>
          <AboutShowText dangerouslySetInnerHTML={{ __html: PARAGRAPH_1 }} />
          <AboutShowText dangerouslySetInnerHTML={{ __html: PARAGRAPH_2 }} />
          <AboutShowText dangerouslySetInnerHTML={{ __html: PARAGRAPH_3 }} />
        </DefaultViewport>
      </Container>
    )
  }
}
