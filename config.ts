require('dotenv').config({})

declare global {
  interface AppConfig {
    port?: any 
    endpointURL?: string
    cookieSecret: string
    isDev: boolean
    facebook: {
      id: string
      secret: string
      callbackUrl: string
    }
    mongodbUrl?: string
    bucketName?: string
  }
}
export default {
  port: process.env.PORT || 3000,
  mongodbUrl: process.env.MONGODB_URL,
  endpointURL: process.env.ENDPOINT_URL || 'http://localhost:3000',
  isDev: process.env.NODE_ENV !== 'production',
  cookieSecret: process.env.COOKIE_SECRET || 'development-cookie-secret',
  facebook: {
    id: process.env.FACEBOOK_ID,
    secret: process.env.FACEBOOK_SECRET,
    callbackUrl: process.env.FACEBOOK_CALLBACK_URL
  },
  bucketName: process.env.GCLOUD_BUCKET_NAME || 'upload-demo'

}