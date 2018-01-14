import thTh from '../i18n/th-th'
import * as path from 'path'

import * as fs from 'fs'
import { Response } from 'express'
var pdf = require('html-pdf')
const jszip = require('jszip')
var archiver = require('archiver')
var mkdirp = require('mkdirp')
const rimraf = require('rimraf')

export function renderFormToHTML(auditionInfo: AuditionInformation) {
  const row = (label, value) => `
    <div>
      <span style='font-size: 8px'>${thTh[label]}</span>: ${value}
    </div>
  `

  let html = ''
  const members = auditionInfo.members
    .map((member, index) => {
      const fields = Object.keys(member)
        .filter(key => key !== '__v')
        .filter(key => key !== '_id')
        .filter(key => key !== 'profileImageURL')
        .map(key => {
          return row(key, member[key])
        })
        .join('')

      return `
      <h2>สมาชิกคนที่ ${index + 1}</h2>
      <img src='${member['profileImageURL']}' width='150' />
      <a href='${member['profileImageURL']}'>${member['profileImageURL']}</a>
      <div style='display: inline-block'>
      ${fields}
      </div>
    `
    })
    .join('')
  const detail = Object.keys(auditionInfo)
    .filter(key => key !== 'members')
    .filter(key => key !== '__v')
    .filter(key => key !== '__v')
    .filter(key => key !== 'isConfirm')
    .filter(key => key !== 'ownerId')
    .map(key => {
      if (auditionInfo[key]) {
        return row(key, auditionInfo[key])
      }
      return ''
    })
    .join('')

  return (
    `
    <html>
    <head>
    <meta charSet="utf-8" className="next-head" />
    </head>
    <body>
    ` +
    members +
    `
      <h2> รายละเอียด </h2>
      ${detail}
    ` +
    `
    </body>
    </html>
    `
  )
}
export function renderFormToPDF(auditionInfo: AuditionInformation, folderName) {
  return new Promise((resolve, reject) => {
    const html = renderFormToHTML(auditionInfo)
    var options = { format: 'A4' }
    pdf
      .create(html, options)
      .toFile(`${folderName}/${auditionInfo._id}.pdf`, function(err, res) {
        if (err) return console.log(err)
        resolve(res)
      })
  })
}
export default function enhancePdfAPI(app, context: APIContext) {
  const handler = async (req, res: Response) => {
    const timestamp = Date.now()
    const ids = req.body.ids.split(',')
    if (!ids) {
      res.status(403).end()
      return
    }
    if (ids.length === 0) {
      res.status(403).end()
      return
    }
    const results: any = await context.models.AuditionInformation.find({
      _id: { $in: ids }
    }).lean()

    const folderName = `./static/wod-${timestamp}`
    // const output = fs.createWriteStream(path.join(folderName, ))

    mkdirp(folderName, async function(err) {
      if (err) console.error(err)
      const fileList = []
      for (let info of results) {
        console.log('generate....', info._id)
        const path = await renderFormToPDF(info, folderName)
        fileList.push(path)
      }
      console.log(fileList)
      /** ZIP file */
      res.on('finish', function() {
        console.log('response end')
        setTimeout(
          () =>
            rimraf(folderName, function(er) {
              if (er) console.error(er)
            }),
          1000
        )
      })
      var archive = archiver('zip', {
        zlib: { level: 9 } // Sets the compression level.
      })
      archive.pipe(res)
      archive.directory(`${folderName}`, false)
      archive.finalize()
    })
  }

  app.post('/documents.zip', handler)
}
