import { Schema, Document } from 'mongoose'

declare global {
  interface BasicProfile {
    email?: string
    firstname?: string
    lastname?: string
    mobileNo?: string
    profileImageURL?: string
  }
  interface User extends BasicProfile {
    _id: any
    facebookId?: string
    facebookUrl?: string
    name: string
    gender?: string
  }
  interface UserDocument extends Document, User {}
}

const UserSchema = new Schema({
  email: { type: String, required: true },
  mobileNo: { type: String },
  facebookId: { type: String },
  firstname: { type: String },
  lastname: { type: String },
  gender: { type: String },
  facebookUrl: { type: String },
  profileImageURL: {
    type: String
  }
})

export default UserSchema