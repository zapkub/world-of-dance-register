import { compose, withProps, withState, ComponentEnhancer } from 'recompose'

declare global {
  interface WithVideoUploadPropType extends React.HTMLAttributes<any> {
    setFiles?: (files: FileList) => void
    confirmUploadVideo?: () => void
    videoFile?: any
    loading?: number
    value?: string
    onResetVideoURL?: () => void
  }
}

interface WithVideoUploadComposePropType {
  files?: FileList
  videoFile?: FileList
  setFilesToState?: (files: any) => void
  loading?: number
  setLoading?: (loading: number) => void
  type?: string
  onChange?: (url: any) => void
  preUpload?: () => void
  value?: string
  onResetVideoURL?: () => void
}
export default (
  callback: (url, ownProps) => void
): ComponentEnhancer<{}, WithVideoUploadComposePropType> =>
  compose<{}, WithVideoUploadPropType>(
    withState('files', 'setFilesToState', null),
    withState('loading', 'setLoading', 100),
    withProps<{}, WithVideoUploadComposePropType>(props => ({
      setFiles: files => {
        if (files[0].size > 2000000) {
          props.setFilesToState(files)
        }
      },
      videoFile: props.files ? props.files[0] : undefined,
      confirmUploadVideo: async () => {
        if(props.preUpload) {
          await props.preUpload()
        }
        props.setLoading(0)
        const formData = new FormData()
        formData.append('vid', props.files[0])
        var xhr = new XMLHttpRequest()

        xhr.open('post', `/upload-video/${props.type}`, true)

        xhr.upload.onprogress = function(e) {
          if (e.lengthComputable) {
            var percentage = e.loaded / e.total * 100
            props.setLoading(percentage)
          }
        }

        xhr.onerror = function(e) {
          console.info(
            'An error occurred while submitting the form. Maybe your file is too big'
          )
        }

        xhr.onload = function() {
          const result = JSON.parse(this.responseText)
          callback(result.url, props)
        }

        xhr.send(formData)
      }
    }))
  )
