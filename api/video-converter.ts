var hbjs = require('handbrake-js')
const vidConvertedJob = {}
export default async (path, id): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (vidConvertedJob[id]) {
      vidConvertedJob[id].cancel()
    }
    console.log('convert file.. job name: ', id)
    const output = path + '.converted.mp4'
    vidConvertedJob[id] = hbjs
      .spawn({
        input: path,
        output,
        encoder: 'x264'
      })
      .on('error', function(err) {
        // invalid user input, no video found etc
        reject(err)
      })
      .on('progress', function(progress) {
        console.log(
          'Percent complete: %s, ETA: %s',
          progress.percentComplete,
          progress.eta
        )
      })
      .on('end', data => {
        resolve(output)
      })
      .on('cancelled', () => {
        console.log(`job from ${id} has cancelled`)
      })
      console.log(vidConvertedJob[id].options)
  })
}
