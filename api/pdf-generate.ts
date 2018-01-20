import thTh from '../i18n/th-th'
import * as path from 'path'

import * as fs from 'fs'
import { Response } from 'express'
import { Buffer } from 'buffer'
const fetch = require('isomorphic-fetch')
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
    .filter(key => key !== 'createdAt' && key !== 'updatedAt')
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
async function downloadAndSaveFile(url, path) {
  return new Promise(async (resolve) => {
    const response = await fetch(url)
    const output = fs.createWriteStream(path)
    response.body.pipe(output)
    output.on('finish', function() {
      resolve(path)
    })
  })
}
export function renderFormToPDF(auditionInfo: AuditionInformation, folderName) {
  return new Promise(async (resolve, reject) => {
    /**
     * Fetch profileImage
     */
    fs.mkdirSync(path.join(folderName, auditionInfo._id.toString()))
    folderName = path.join(folderName, auditionInfo._id.toString()) 
    let memberCount = 0
    for (let member of auditionInfo.members) {
      if (member.profileImageURL) {
        try {
          const imgPath = `${folderName}/member.${memberCount}.jpg`
          await downloadAndSaveFile(member.profileImageURL, imgPath)
          member.profileImageURL = `file://${imgPath}`
        } catch (e) {
          console.error(e)
          console.log(member)
        }

        memberCount++
      }
    }
    const html = renderFormToHTML(auditionInfo)
    fs.writeFileSync(`${folderName}/index.html`, html)
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
    const ids = req.body.ids
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
    const folderAbsolute = `/static/tmp/wod-${timestamp}`
    const folderName = path.join(__dirname, `..${folderAbsolute}`)

    mkdirp(folderName + '/files', async function(err) {
      const output = fs.createWriteStream(
        path.join(folderName, 'documents.zip')
      )
      if (err) console.error(err)
      const fileList = []

      res.setHeader('X-Content-Type-Options', 'nosniff')
      res.setHeader('Content-Type', 'text/plain')
      res.setHeader('Transfer-Encoding', 'chunked')
      res.write(
        JSON.stringify({
          current: 0,
          total: results.length
        })
      )
      for (let info of results) {
        console.log('generate....', info._id)
        const path = await renderFormToPDF(info, folderName + '/files')
        fileList.push(path)
        res.write(
          '|' +
            JSON.stringify({
              current: fileList.length,
              total: results.length
            })
        )
      }
      res.write(
        '|' +
          JSON.stringify({
            url: folderAbsolute + '/documents.zip'
          })
      )
      res.end()
      /** ZIP file */
      var archive = archiver('zip', {
        zlib: { level: 9 } // Sets the compression level.
      })
      archive.pipe(output)
      archive.directory(`${folderName}/files`, false)
      archive.finalize()
    })
  }

  app.post('/documents.zip', handler)
}
