
import * as express from 'express'
import * as fs from 'fs'
import * as path from 'path'
import * as Storage from '@google-cloud/storage'

const multipart = require('connect-multiparty');

const storage = Storage({
  keyFilename: path.join(__dirname, '../gcloud-secret.json'),
})


function uploadFileToGCS() {

}

const multipartMiddleware = multipart();
export default async function (server: express.Application, context: APIContext) {
  try {
    const bucket = await storage.bucket(context.config.bucketName)
    const isExists = await bucket.exists()
    if (!isExists) {
      context.logger.log('Bucket to store vid file is not exits... try to create one')
    } else {
      server.post('/upload', multipartMiddleware, async function (req: any, res) {

        res.json({ msg: 'done, your file is under processing...' })
        if (req.files.vid) {
          console.log('upload file..', req.files)
          const result = await bucket.upload(req.files.vid.path, {
            destination: `/junior/${req.user._id}` 
          })
          console.log('upload file to storage complete')
          console.log(result)
        }
      })
    }
  } catch (e) {
    context.logger.log(`ERROR: cannot connect to gcloud bucket`)
    throw e
  }
}