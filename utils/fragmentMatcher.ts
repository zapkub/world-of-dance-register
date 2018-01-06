import config from '../config'
require('isomorphic-fetch')
const fs = require('fs')

export default async function() {
  return new Promise((resolve, reject) => {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    fetch(`http://localhost:${config.port}/graphql`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `
      })
    })
      .then(result => result.json())
      .then(result => {
        // here we're filtering out any type information unrelated to unions or interfaces
        const filteredData = result.data.__schema.types.filter(
          type => type.possibleTypes !== null
        )
        result.data.__schema.types = filteredData
        fs.writeFile(
          './fragmentTypes.json',
          JSON.stringify(result.data),
          err => {
            if (err) console.error('Error writing fragmentTypes file', err)
            console.log('Fragment types successfully extracted!')
            resolve()
          }
        )
      })
  })
}
