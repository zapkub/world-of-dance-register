import { validate } from 'graphql/validation/validate'
import * as moment from 'moment'
import { members } from './auditionInfoFields'
import th from '../../i18n/th-th'

function shouldFillText(fieldValue: string) {
  if (!fieldValue || fieldValue.length < 1) {
    return false
  }
  return true
}

export default (auditionInfo: AuditionInformation) => {
  const validateTextField = (fieldName: string) => {
    console.log(fieldName, auditionInfo[fieldName])
    if (!shouldFillText(auditionInfo[fieldName])) {
      console.log('error', fieldName)
      const e = new Error( 'กรุณากรอก ' + th[fieldName])
      e.name = 'validate-error'
      throw e
    }
  }

  console.log(auditionInfo.auditionType)
  if (/\_team/.test(auditionInfo.auditionType)) {
    validateTextField('title')
    validateTextField('auditionType')
    validateTextField('dancingStyle')
    validateTextField('mobileNo')
    validateTextField('coachName')
    validateTextField('description')
    validateTextField('organizationName')
  } else {
  }

  validateTextField('videoURL')

  /**
   * member validator
   */

  auditionInfo.members.forEach((element, index) => {
    const validateMemberTextField = (fieldName: string) => {
      if (!shouldFillText(element[fieldName])) {
        console.log('error', fieldName)
        const e = new Error()
        e.message = 'กรุณากรอก ' +  th[fieldName] + ` สมาชิกคนที่ ${index + 1}`
        e.name = 'validate-error'
        throw e
      }
    }
    validateMemberTextField('firstname')
    validateMemberTextField('lastname')
    validateMemberTextField('nickname')
    validateMemberTextField('dateOfBirth')
    validateMemberTextField('mobileNo')
    validateMemberTextField('profileImageURL')

    /**
     * checking age of each member
     */

    const dob = moment(element.dateOfBirth)
    const year = dob.year()
    if (/junior/.test(auditionInfo.auditionType)) {
      console.log('validate dob')
      let afterYear = 2002
      let beforeYear = 2010
      if (year > beforeYear) {
        const e = new Error()
        e.message = `สมาชิกคนที่ ${index +
          1} อายุ น้อยกว่ากำหนด (ต้องเกิดก่อนปี 2010)`
        e.name = 'validate-error'
        throw e
      }
      if (year < afterYear) {
        const e = new Error()
        e.message = `สมาชิกคนที่ ${index +
          1} อายุ มากกว่ากำหนด (ผู้สมัครต้องเกิดตั้งแต่ปี 2002)`
        e.name = 'validate-error'
        throw e
      }
    } else if (/upper/.test(auditionInfo.auditionType)) {
      let beforeYear = 2001
      if (year > beforeYear) {
        const e = new Error()
        e.message = `สมาชิกคนที่ ${index +
          1} อายุ น้อยกว่ากำหนด (ต้องเกิดก่อนปี 2001)`
        e.name = 'validate-error'
        throw e
      }
    } else {
      let beforeYear = 2001
      if (year > beforeYear) {
        const e = new Error()
        e.message = `สมาชิกคนที่ ${index +
          1} อายุ น้อยกว่ากำหนด (ต้องเกิดก่อนปี 2001)`
        e.name = 'validate-error'
        throw e
      }
    }
  })
}
