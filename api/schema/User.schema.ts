import { Schema, Document } from 'mongoose'

declare global {
  interface User {
    _id: any
    email: string
    tel: string
    facebookId: string
    facebookUrl: string
    profileImageURL: string
    name: string
    firstName: string
    lastName: string
    gender: string
  }
  interface UserDocument extends Document, User {}
}

const UserSchema = new Schema({
  email: { type: String, required: true },
  mobileNo: { type: String },
  facebookId: { type: String },
  profileImageURL: {
    type: String
  }
})

export default UserSchema