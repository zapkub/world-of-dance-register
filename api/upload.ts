import * as express from 'express'
import * as fs from 'fs'
import * as path from 'path'
import * as Storage from '@google-cloud/storage'

const multipart = require('connect-multiparty')

const storage = Storage({
  keyFilename: path.join(__dirname, '../gcloud-secret.json')
})

function uploadFileToGCS() {}

const multipartMiddleware = multipart()
export default async function(
  server: express.Application,
  context: APIContext
) {
  try {
    const bucket = await storage.bucket(context.config.bucketName)
    const isExists = await bucket.exists()
    if (!isExists) {
      context.logger.log(
        'Bucket to store vid file is not exits... try to create one'
      )
    } else {
      server.post(
        '/upload-video/:type(junior|upper|team)',
        multipartMiddleware,
        async function(req: any, res) {
          await context.models.AuditionInformation.findOneAndUpdate(
            {
              auditionType: req.params.type,
              ownerId: req.user._id
            },
            {
              $set: {
                videoURL: 'PROCESSING'
              }
            }
          )
          res.json({ msg: 'done, your file is under processing...', url: 'PROCESSING' })
          if (req.files.vid) {
            console.log('upload file..', req.files)
            const result = await bucket.upload(req.files.vid.path, {
              destination: `/${req.params.type}/${req.user._id}/video`
            })
            console.log(
              req.user._id, 'upload file to storage complete, write url to audition form'
            )
            if (result[0]) {
              await result[0].makePublic()
              const meta = await result[0].getMetadata()
              if (meta[0]) {
                const k = meta[0] as any
                /**
                 * Find and write data
                 */
                await context.models.AuditionInformation.findOneAndUpdate(
                  {
                    auditionType: req.params.type,
                    ownerId: req.user._id
                  },
                  {
                    $set: {
                      videoURL: k.mediaLink
                    }
                  }
                )
              }
            }
          }
        }
      )

      server.post(
        '/upload-image/member/:type/:index',
        multipartMiddleware,
        async function(req: any, res) {
          if (req.files.image) {
            console.log('upload image...', req.files)
            const result = await bucket.upload(req.files.image.path, {
              destination: `/${req.params.type}/${req.user._id}/member-${
                req.params.index
              }`
            })
            if (result[0]) {
              await result[0].makePublic()
              const meta = await result[0].getMetadata()
              if (meta[0]) {
                const k = meta[0] as any
                res.json({ msg: 'done', url: k.mediaLink })
              }
            }
          } else {
            res.status(403).end()
          }
        }
      )
    }
  } catch (e) {
    context.logger.log(`ERROR: cannot connect to gcloud bucket`)
    throw e
  }
}
