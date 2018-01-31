import theme from '../components/theme'

const th = {
  dancingStyle: 'สไตล์การเต้น',
  coachName: 'ชื่อผู้ควบคุมการแสดง',
  mobileNo: 'เบอร์โทรศัพท์',
  title: 'ชื่อทีม',
  auditionType: 'ประเภท',
  'videoURL field must be provied': 'กรุณาส่งคลิปวีดีโอ',
  description: 'ประวัติของทีม',
  _id: 'รหัส',
  dateOfBirth: 'วันเกิด',
  members: 'สมาชิก',
  gender: 'เพศ',
  email: 'อีเมล',
  firstname: 'ชื่อจริง',
  age: 'อายุ',
  lastname: 'นามสกุล',
  nickname: 'ชื่อเล่น/ชื่อเรียก',
  organizationName: 'โรงเรียน /หน่วยงาน / สถาบัน',
  height: 'ส่วนสูง',
  weight: 'น้ำหนัก',
  videoURL: 'ลิ้ง Clip video',
  profileImageURL: 'ภาพโปรไฟล์',
  nationality: 'สัญชาติ',
  origin: 'เชื้อชาติ',
  relationshipType: 'สถานะ',
  educationBackground: 'ระดับการศึกษา',
  occupation: 'อาชีพ',
  address: 'ที่อยู่',
  male: 'ชาย',
  female: 'หญิง',
  single: 'โสด',
  married: 'แต่งงาน',
  devoiced: 'หย่าร้าง',
  lineId: 'ไลน์',
  instagramUrl: 'อินสตาแกรม',
  facebookUrl: `เฟซบุ้ก <span style="font-weight: 400;font-size:1rem;color:${
    theme.blue
  }">www.facebook.com/</span>`,
  emergencyContactName: 'กรณีเร่งด่วนสามารถติดต่อได้ที่คุณ',
  emergencyContactRelationAs: 'โดยมีความเกี่ยวข้องกับผู้สมัครเป็น',
  emergencyContentMobileNo: 'เบอร์โทรศัพท์',
  isAlreadyTrainByInstitutionName: 'คุณเคยผ่านการเรียนเต้น / การแสดง หรือไม่',
  isAlreadyHasEntertainingProfile: 'คุณเคยมีผลงานในวงการบันเทิงหรือไม่'
}

declare global {
  interface AuditionInfo {
    title: string
    subtitle: string
    description: string
    ageLabel: string
    memberAmountLabel: string
  }
}
export const AuditionInfoList: AuditionInfo[] = [
  {
    title: 'Junior',
    subtitle: 'เด็ก',
    ageLabel: 'อยู่ในช่วงระหว่างอายุ 8-16 ปี',
    memberAmountLabel: 'จำนวนผู้เข้าแข่งขัน 1-20 คน',
    description: `ประเภทเด็ก สามารถมาในรูปแบบเดี่ยวและกลุ่ม โดยสมาชิกในกลุ่มจะต้อง ไม่เกิน 20 คน ไม่จำกัดเพศและสไตล์การเต้นใดๆทั้งสิ้น โดยผู้เข้าสมัครแข่งขันประเภทเด็ก จะต้องมีอายุระหว่าง 8-16 ปี <br />(เกิดระหว่าง พ.ศ. 2545 – พ.ศ. 2553)`
  },
  {
    title: 'Upper',
    subtitle: 'บุคคลทั่วไป',
    ageLabel: 'อายุ 17 ปี ขึ้นไป',
    memberAmountLabel: 'จำนวนผู้เข้าแข่งขัน 1-4 คน',
    description: `ประเภทบุคคลทั่วไป สามารถมาในรูปแบบเดี่ยวและกลุ่ม โดยถ้าเป็นกลุ่ม สมาชิกในกลุ่มจะต้องไม่เกิน 4 คน ไม่จำกัดเพศและสไตล์การเต้นใดๆทั้งสิ้น โดยผู้เข้าสมัครแข่งขันประเภทบุคคลทั่วไป จะต้องมีอายุ 17 ปีขึ้นไป (ผู้ที่เกิดในปี พ.ศ. 2544 และ ผู้ที่เกิดก่อนปี พ.ศ.2544)`
  },
  {
    title: 'Team',
    subtitle: 'กลุ่ม',
    ageLabel: 'อายุ 17 ปี ขึ้นไป',
    memberAmountLabel: 'จำนวนผู้เข้าแข่งขันในกลุ่ม 5-20 คน',
    description: `ประเภทกลุ่ม ต้องมีสมาชิกในกลุ่มไม่ต่ำกว่า 5 คน และจะต้องไม่เกิน 20 คน ไม่จำกัดเพศและสไตล์การเต้นใดๆทั้งสิ้น  โดยผู้เข้าสมัครแข่งขันประเภทกลุ่ม จะต้องมีอายุ 17 ปีขึ้นไปทุกคน (ผู้ที่เกิดในปี พ.ศ. 2544 และ ผู้ที่เกิดก่อนปี พ.ศ.2544)`
  }
]

export default th
