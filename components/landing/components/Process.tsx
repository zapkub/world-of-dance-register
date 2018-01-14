import * as React from 'react'
import theme from '../../theme'
import styled from 'styled-components'
import { Text } from '../../Text'
import { DefaultViewport } from '../../Viewport'
import { withBottomBorder, HeaderRoot, HeaderOne } from '../../Header'

const ABOUT_SHOW_MIN_HEIGHT = 480

const Container = styled.div`
  min-height: ${ABOUT_SHOW_MIN_HEIGHT}px;
  font-size: 1.1rem;
`


const PARAGRAPH_1 = `รายการ WORLD OF DANCE ค้นหานักเต้นที่มีความสามารถด้านการเต้นทุกรูปแบบ สามารถผสมผสานการเต้นหลากหลายสไตล์ ได้อย่างลงตัว สร้างความโดดเด่น แสดงความคิดสร้างสรรค์ ในการออกแบบท่าเต้น และการเลือกใช้เพลงประกอบการเต้น เพื่อเผยตัวตนที่ชัดเจน ให้เป็นที่น่าจดจำ เพื่อเหมาะสมกับตำแหน่งสุดยอดนักเต้นอันดับหนึ่งของเมืองไทยพร้อมเงินรางวัลหนึ่งล้านบาท
`
const PARAGRAPH_2 = `
ลงทะเบียนและยอมรับเงื่อนไขการแข่งขัน ส่งวีดีโอความสามารถด้านการเต้นของคุณ ประกอบกับการเลือกเสื้อผ้า และสถานที่อย่างเหมาะสม ความยาวไม่เกิน 3 นาที พร้อมกรอกใบสมัคร  และรอการติดต่อกลับจากทางรายการ โดยทางรายการจะติดต่อกลับสำหรับผู้ที่เข้ารอบเท่านั้น
`
const PARAGRAPH_3 = `
  <li>ลงทะเบียน กรอกใบสมัครข้อมูลส่วนตัวให้ครบถ้วน พร้อมแนบรูปถ่ายเดี่ยว หรือกลุ่มของคุณ  และบอกเล่าเรื่องราวการเต้นของคุณ หรือทีมของคุณที่อยากให้เรารู้จัก</li>
  <li>ผู้ที่อายุไม่ถึง 20 ปีบริบูรณ์ต้องได้รับความยินยอมจากผู้ปกครอง โดยให้ผู้ปกครองเซ็นรับรองเอกสารพร้อมทั้งแนบสำเนาบัตรประชาชนของผู้ปกครองที่มีลายเซ็นกำกับ นำมาให้เจ้าหน้าที่ วันที่ผ่านเข้ารอบ (สามารถพิมพ์ใบยินยอมได้ทาง _______________ )</li>
  <li>อัพโหลดวิดีโอ ความยาว 1- 3 นาที โดยเริ่มต้นจากบอกเล่าชื่อของคุณหรือชื่อทีม พร้อมกับอธิบายถึงสิ่งที่กำลังจะแสดงให้ดูสั้นๆ พร้อมโชว์ความสามารถด้านการเต้นให้เราได้เห็น</li>
  <li>สิ้นสุดการรับสมัคร วันอาทิตย์ที่ 11 กุมภาพันธ์ 2561</li>
`

export default class AboutShow extends React.Component {
  render() {
    return (
      <Container id="process">
        <DefaultViewport>
          <HeaderOne withBorder> {' ขั้นตอนการสมัคร '} </HeaderOne>
          <Text dangerouslySetInnerHTML={{ __html: PARAGRAPH_1 }} />
          <br />
          <HeaderOne withBorder>{'วิธีการสมัคร'}</HeaderOne>
          <Text dangerouslySetInnerHTML={{ __html: PARAGRAPH_2 }} />
          <ol style={{paddingLeft: 21, listStyle: 'decimal', lineHeight: '1.71em', marginTop: 34, color: theme.text}} dangerouslySetInnerHTML={{ __html: PARAGRAPH_3 }} />
        </DefaultViewport>
      </Container>
    )
  }
}
