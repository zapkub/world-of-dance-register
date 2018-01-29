var hbjs = require('handbrake-js')
const vidConvertedJob = {}
export default (path, id): {
  promise: Promise<any>,
  instance: any
} => {
  const promise = new Promise((resolve, reject) => {
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
        resolve(err)
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
        resolve('cancel')
      })
    console.log(vidConvertedJob[id].options)
  })

  return {
    promise,
    instance: vidConvertedJob[id]
  }
}
