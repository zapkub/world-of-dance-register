const imagemin = require('imagemin')
const imageminJpegRecompress = require('imagemin-jpeg-recompress');
var pngquant = require('imagemin-pngquant');
var jpegtran = require('imagemin-jpegtran');
const path = require('path')
var gifsicle = require('imagemin-gifsicle');

function run() {
  imagemin(["./static/images-source/*.{jpg,png}"], "./static/images", {
    plugins: [
      imageminJpegRecompress({ progressive: true, method: 'smallfry', quality: 'veryhigh' }),
      pngquant(), jpegtran(), gifsicle()
    ]
  }).then(files => {
    files.forEach(file => console.log(file.path))
  })
}


run()