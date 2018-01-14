import { Schema, Document } from 'mongoose'

declare global {
  interface BasicProfile {
    email?: string
    firstname?: string
    lastname?: string
    mobileNo?: string
    dateOfBirth?: Date
    profileImageURL?: string
  }
  interface User extends BasicProfile {
    _id: any
    facebookId?: string
    facebookUrl?: string
    name: string
    gender?: string
    password?: string
  }
  interface UserDocument extends Document, User {}
}

const UserSchema = new Schema({
  email: { type: String },
  mobileNo: { type: String },
  facebookId: { type: String, required: true, unique: true },
  firstname: { type: String },
  lastname: { type: String },
  gender: { type: String },
  facebookUrl: { type: String },
  password: { type: String },
  role: { type: String, enum: ['ADMIN', 'USER'], default: 'USER' },
  profileImageURL: {
    type: String
  }
})

export default UserSchema