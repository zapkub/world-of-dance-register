import { Schema, Document } from 'mongoose'
import singAuditionFields from './singleAuditionProfileFields'
import singleAuditionProfileFields from './singleAuditionProfileFields'
import { members } from './auditionInfoFields'
declare global {
  type AuditionEnumType =
    | 'upper'
    | 'upper_team'
    | 'junior'
    | 'junior_team'
    | 'team'
  interface Member extends BasicProfile {
    _id: string
    nickname?: string
    __typename?: string
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

    height?: number
    weight?: number
    nationality?: string
    origin?: string
    relationshipType?: 'single' | 'married' | 'devoiced'
    educationBackground?: string
    occupation?: string
    address?: string
    lineId?: string

    emergencyContactName?: string
    emergencyContactRelationAs?: string
    emergencyContentMobileNo?: string

    isAlreadyTrainByInstitutionName?: string
    isAlreadyHasEntertainingProfile?: string
  }
  interface AuditionInformationDocument extends Document, AuditionInformation {}
}

const AuditionInformationSchema = new Schema({
  auditionType: {
    type: String,
    enum: ['upper', 'junior', 'team', 'upper_team', 'junior_team']
  },
  title: { type: String, defualt: '' },
  description: { type: String, default: '' },
  mobileNo: { type: String, default: '' },
  dancingStyle: { type: String, default: '' },
  coachName: { type: String, default: '' },
  members: {
    type: [members],
    default: []
  },
  organizationName: {type: String, default: ''},
  videoURL: {type: String, default: ''},
  ownerId: Schema.Types.ObjectId,
  isConfirm: {type: Boolean, default: false},

  /** Single audition */

  ...singleAuditionProfileFields
}, {
  timestamps: true,
  minimize: false
})

export default AuditionInformationSchema
