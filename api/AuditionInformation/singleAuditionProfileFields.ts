export default {

  height: {
    type: Number,
    placeholder: 'หน่วย เซนติเมตร'
  },
  weight: {
    type: Number,
    placeholder: 'หน่วย กิโลกรัม'
  },

  nationality: {
    type: String
  },
  origin: {
    type: String
  },
  relationshipType: { type: String, enum: ['single', 'married', 'devoiced'] },
  educationBackground: {
    type: String
  },
  occupation: {
    type: String
  },
  address: {
    type: String
  },
  lineId: {
    type: String
  },
  instagramUrl: {
    type: String,
    
  },
  facebookUrl: {
    type: String
  },

  emergencyContactName: {
    type: String,
  },
  emergencyContactRelationAs: {
    type: String
  },
  emergencyContentMobileNo: {
    type: String,
    placeholder: 'ต้องไม่ใช่เบอร์เดียวกับผู้สมัคร'
  },

  isAlreadyTrainByInstitutionName: {
    type: String,
    placeholder: 'ถ้ามี โปรดระบุ....'
  },
  isAlreadyHasEntertainingProfile: {
    type: String,
    placeholder: 'ถ้ามี โปรดระบุ....'
  }
}
