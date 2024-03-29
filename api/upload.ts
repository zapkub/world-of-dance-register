import * as express from 'express'
import * as fs from 'fs'
import * as path from 'path'
import * as Storage from '@google-cloud/storage'
import converter from './video-converter'
import { defaultFormInfo } from './AuditionInformation/generateDefault'

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
        '/upload-video/:type(junior|upper|team|junior_team|upper_team)',
        multipartMiddleware,
        async function(req: any, res) {
          let auditionInfo = await context.models.AuditionInformation.findOne({
            auditionType: req.params.type,
            ownerId: req.user._id
          }).lean()

          if (!auditionInfo) {
            auditionInfo = await context.models.AuditionInformation.create({
              ...defaultFormInfo(req.params.type),
              _id: undefined,
              ownerId: req.user._id
            })
          }
          auditionInfo = await context.models.AuditionInformation.findOneAndUpdate(
            {
              auditionType: req.params.type,
              ownerId: req.user._id
            },
            {
              $set: {
                videoURL: 'PROCESSING'
              }
            },
            {
              upsert: true,
              new: true
            }
          ).lean()
          res.json({
            msg: 'done, your file is under processing...',
            url: 'PROCESSING',
            record: auditionInfo
          })
          if (req.files.vid) {
            const queue = converter(
              req.files.vid.path,
              req.user._id + req.params.type
            )
            try {
              const path = await queue.promise
              const result = await bucket.upload(path, {
                destination: `/${req.params.type}/${req.user._id}/video`,
                metadata: {
                  contentType: 'video/mp4'
                }
              })
              console.log(
                req.user._id,
                'upload file to storage complete, write url to audition form'
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
                  console.log(
                    'update audition url file complete: ',
                    k.mediaLink
                  )
                  fs.unlink(req.files.vid.path, () => {
                    fs.unlink(path, () => {
                      console.log(
                        'unlink tmp files: ',
                        path,
                        req.files.vid.path
                      )
                    })
                  })
                }
              }
            } catch (e) {
              console.error('[upload]', e)
              await context.models.AuditionInformation.findOneAndUpdate(
                {
                  auditionType: req.params.type,
                  ownerId: req.user._id
                },
                {
                  $set: {
                    videoURL: 'ERROR'
                  }
                }
              )
            }
          }
        }
      )

      server.post(
        '/upload-image/member/:type(junior|upper|team|junior_team|upper_team)/:index',
        multipartMiddleware,
        async function(req: any, res) {
          if (req.files.image) {
            console.log('upload image...', req.files)
            const result = await bucket.upload(req.files.image.path, {
              destination: `/${req.params.type}/${req.user._id}/member-${
                req.params.index
              }`,
              metadata: {
                contentType: 'image/jpeg'
              }
            })
            if (result[0]) {
              await result[0].makePublic()
              const meta = await result[0].getMetadata()
              if (meta[0]) {
                const k = meta[0] as any
                const url = `https://storage.googleapis.com/${k.bucket}/${
                  k.name
                }`
                console.log(url)
                res.json({ msg: 'done', url })
                await fs.unlink(req.files.image.path, function() {
                  console.info('remove tmp image', req.files.image.path)
                })
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
