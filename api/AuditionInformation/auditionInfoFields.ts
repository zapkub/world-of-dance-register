export const members = {
  _id: {
    type: String
  },
  dateOfBirth: {
    type: Date,
    isForm: true
  },
  email: {
    type: String,
    isForm: true,
    placeholder: 'หากไม่มีอีเมล ให้กรอกของผู้ดูแล'
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    default: 'male',
    isForm: true
  },
  firstname: {
    type: String,
    isForm: true,
  },
  lastname: {
    type: String,
    isForm: true,
  },
  mobileNo: {
    type: String,
    isForm: true
  },
  nickname: {
    type: String,
    isForm: true,
  },
  profileImageURL: {
    type: String
  }
}
