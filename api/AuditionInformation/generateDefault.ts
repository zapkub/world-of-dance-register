import singleAuditionProfileFields from "./singleAuditionProfileFields";
const uuid = require('uuid')

export  const MEMBER_TYPE_LIMIT = {
  upper: {
    min: 1,
    max: 1
  },
  upper_team: {
    min: 2,
    max: 4
  },
  team: {
    min: 5,
    max: 20
  },
  junior: {
    min: 1,
    max: 1
  },
  junior_team: {
    min: 2,
    max: 20
  }
}
function genDefaultMembers(type: AuditionEnumType) {
  let members = []
  for (let i = 0; i < MEMBER_TYPE_LIMIT[type].min; i++) {
    members.push({
      email: '',
      _id: uuid(),
      firstname: '',
      lastname: '',
      mobileNo: '',
      gender: 'male',
      dateOfBirth: (new Date()),
      nickname: '',
      profileImageURL: '',
      __typename: 'AuditionInformationMembers'
    })
  }
  return members
}
function genSingleAuditionInfoFields() {
  let fields = {}
  for (let key of Object.keys(singleAuditionProfileFields)) {
    fields[key] = null
    if (singleAuditionProfileFields[key].enum) {
      fields[key] = singleAuditionProfileFields[key].enum[0]
    }
  }
  return fields
}
export const defaultFormInfo = (
  type?: AuditionEnumType
): AuditionInformation & { __typename: string } => ({
  _id: 'client-state-form-' + type,
  members: [...genDefaultMembers(type)],
  title: '',
  description: '',
  coachName: '',
  mobileNo: '',
  dancingStyle: '',
  organizationName: '',
  auditionType: type,
  isConfirm: false,
  ...genSingleAuditionInfoFields(),
  __typename: 'AuditionInformation'
})