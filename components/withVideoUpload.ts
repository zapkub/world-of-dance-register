import { compose, withProps, withState } from 'recompose'

declare global {
  interface WithVideoUploadPropType {
    setFiles?: (files: FileList) => void
    confirmUploadVideo?: () => void
    videoFile?: any
  }
}

interface WithVideoUploadComposePropType {
  files?: FileList
}
export default compose<{}, WithVideoUploadPropType>(
  withState('files', 'setFiles', null),
  withProps<{}, WithVideoUploadComposePropType>(props => ({
    confirmUploadVideo: () => {
      const formData = new FormData()
      formData.append('vid', props.files[0])
      var xhr = new XMLHttpRequest()

      xhr.open('post', '/upload', true)

      xhr.upload.onprogress = function(e) {
        if (e.lengthComputable) {
          var percentage = e.loaded / e.total * 100
          console.log(percentage)
        }
      }

      xhr.onerror = function(e) {
        console.info(
          'An error occurred while submitting the form. Maybe your file is too big'
        )
      }

      xhr.onload = function() {
        console.log(this.statusText)
      }

      xhr.send(formData)
    }
  }))
)
