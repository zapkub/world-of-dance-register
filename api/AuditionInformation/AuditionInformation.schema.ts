import { Schema, Document } from 'mongoose'

declare global {
  type AuditionEnumType = 'upper' | 'junior' | 'team'
  interface Member extends BasicProfile {
    _id: string
    nickname?: string
    __typename?: string
    age?: number
  }
  interface AuditionInformation {
    _id: any
    auditionType?: AuditionEnumType
    title?: string
    dancingStyle?: string
    coachName?: string
    description?: string
    mobileNo?: string
    organizationName?: string
    members?: Member[]
    videoURL?: string
    ownerId?: any
    isConfirm?: boolean
  }
  interface AuditionInformationDocument extends Document, User {}
}

const AuditionInformationSchema = new Schema({
  auditionType: { type: String, enum: ['upper', 'junior', 'team'] },
  title: String,
  description: String,
  mobileNo: String,
  dancingStyle: String,
  coachName: String,
  members: [
    {
      _id: String,
      email: String,
      firstname: String,
      age: Number,
      lastname: String,
      mobileNo: String,
      nickname: String,
      profileImageURL: String
    }
  ],
  organizationName: String,
  videoURL: String,
  ownerId: Schema.Types.ObjectId,
  isConfirm: Boolean
})

export default AuditionInformationSchema
