import * as React from 'react'
import theme from '../../theme'
import styled from 'styled-components'
import bp from 'styled-components-breakpoint'
import { Text } from '../../Text'
import { DefaultViewport } from '../../Viewport'
import { withBottomBorder, HeaderRoot, HeaderOne } from '../../Header'
import { Image } from '../../Logo';

const ABOUT_SHOW_MIN_HEIGHT = 480

const Container = styled.div`
  background-position: center center;
  background-repeat: no-repeat;
  min-height: ${ABOUT_SHOW_MIN_HEIGHT}px;
  text-align:center;
  font-size: 1em;
  position:relative;
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
  li {
    margin: 31px 0;
  }
`

const PARAGRAPH_1 = `
<h2 style="margin:21px 0;"><span class="highlight">ไม่ว่าคุณจะเป็นใคร อายุเท่าไหร่ เพศอะไร ไม่สำคัญ!</span></h2>
<p style="text-align:center">
ขอแค่มีหัวใจที่รักการเต้น และพร้อมที่จะแสดงศักยภาพสู่สายตาคนไทยทั้งประเทศ<br />
ร่วมสมัครเข้าแข่งขันกับ WORLD OF DANCE Thailand ได้ทันที<br />
</p>

`
const PARAGRAPH_2 = `
ลงทะเบียนและยอมรับเงื่อนไขการแข่งขัน ส่งวีดีโอความสามารถด้านการเต้นของคุณ ประกอบกับการเลือกเสื้อผ้า<br />และสถานที่อย่างเหมาะสม ความยาวไม่เกิน 3 นาที พร้อมกรอกใบสมัคร 
 และรอการติดต่อกลับจากทางรายการ <br />โดยทางรายการจะติดต่อกลับสำหรับผู้ที่เข้ารอบเท่านั้น
`
const PARAGRAPH_3 = `
  <li>ลงทะเบียน กรอกใบสมัครข้อมูลส่วนตัวให้ครบถ้วน พร้อมแนบรูปถ่ายเดี่ยว หรือกลุ่มของคุณ <br />และบอกเล่าเรื่องราวการเต้นของคุณ หรือทีมของคุณที่อยากให้เรารู้จัก</li>
  <li>ผู้ที่อายุไม่ถึง 20 ปีบริบูรณ์ต้องได้รับความยินยอมจากผู้ปกครอง โดยให้ผู้ปกครองเซ็นรับรองเอกสารพร้อมทั้ง<br />แนบสำเนาบัตรประชาชนของผู้ปกครองที่มีลายเซ็นกำกับ นำมาให้เจ้าหน้าที่ วันที่ผ่านเข้ารอบ 
  <br /> (สามารถพิมพ์ใบยินยอมได้ทาง <a href="/static/agreement-document.pdf" target="_blank">คลิกที่นี่เพื่อดาวโหลดใบยินยอม</a>)</li>
  <li>อัพโหลดวิดีโอ ความยาว 1- 3 นาที โดยเริ่มต้นจากบอกเล่าชื่อของคุณหรือชื่อทีม พร้อมกับอธิบายถึงสิ่งที่กำลังจะแสดง<br />ให้ดูสั้นๆ พร้อมโชว์ความสามารถด้านการเต้นให้เราได้เห็น</li>
  <li>เปิดรับสมัคร 1 กุมภาพันธ์ 2561 สิ้นสุด 28 กุมภาพันธ์ 2561</li>
`

export default class AboutShow extends React.Component {
  render() {
    return (
      <Container id="process">
        <DefaultViewport style={{paddingTop: 0}}>
          <h1> {' ขั้นตอนการสมัคร '} </h1>
          <Text
            style={{ color: 'white', fontSize: '1.2em' }}
            dangerouslySetInnerHTML={{ __html: PARAGRAPH_1 }}
          />
          <br />
          <br />
          <HeaderOne withLandingBorder>{'วิธีการสมัคร'}</HeaderOne>
          <Text
            style={{color:'white', fontSize: '1.2em' }}
            dangerouslySetInnerHTML={{ __html: PARAGRAPH_2 }}
          />
          <Text 
            style={{color:'white', fontSize: '1.2em' }}
          >
            <ol
              style={{
                paddingLeft: 21,
                listStyle: 'decimal',
                textAlign: 'left',
                marginTop: 34,
                color: 'white'
              }}
              dangerouslySetInnerHTML={{ __html: PARAGRAPH_3 }}
            />
          </Text>
        </DefaultViewport>
        {/* <Image
          className="animated fadeIn spray-left"
          src={'/static/images/spray-left.png'}
          srcHD={'/static/images/spray-left@2x.png'}
        />
        <Image
          className="animated fadeIn spray-right"
          src={'/static/images/spray-right.png'}
          srcHD={'/static/images/spray-right@2x.png'}
        />
         */}
      </Container>
    )
  }
}
