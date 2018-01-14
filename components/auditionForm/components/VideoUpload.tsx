import * as React from 'react'
import { Button, UploadButton } from '../../Button'
import { Image } from '../../Logo'
import styled from 'styled-components'
import theme from '../../theme'

const CLOUD_ICON = '/static/images/cloud-upload-icon.png'
const CLOUDE_ICON_2X = '/static/images/cloud-upload-icon@2x.png'

const Container = styled.div`
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  box-sizing: border-box;
`
const ReUploadButton = styled(Button)`
  position: relative;
  input {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    width: 100%;
  }
`
export default (props: WithVideoUploadPropType) => {
  if (props.value) {
    return (
      <Container>
        {props.value === 'PROCESSING' ? (
          <UploadButton style={{ padding: '21px 13px', fontSize: '1.428em' }}>
            <div className="spinner">
              <div className="rect1" />
              <div className="rect2" />
              <div className="rect3" />
              <div className="rect4" />
              <div className="rect5" />
            </div>
            <div
              style={{lineHeight: 1.7}}
              dangerouslySetInnerHTML={{
                __html:
                  'กำลังอยู่ระหว่างประมวลผล คลิปวีดีโอ <br /> แบบฟอร์มนี้บันทึกอัตโนมัติ <br /> คุณสามารถกรอกแบบฟอร์มด้านล่างต่อไปได้เลย'
              }}
            />
          </UploadButton>
        ) : (
          <UploadButton style={{ padding: '21px 13px', fontSize: '1.428em' }}>
            <video
              id="my-video"
              className="video-js"
              controls
              preload="none"
              width="320"
              data-setup="{}"
            >
              <source src={props.value} />
              <p className="vjs-no-js">
                {
                  ' To view this video please enable JavaScript, and consider upgrading to a web browser that '
                }
                <a
                  href="http://videojs.com/html5-video-support/"
                  target="_blank"
                >
                  {' '}
                  {' supports HTML5 video '}
                </a>
              </p>
            </video>
          </UploadButton>
        )}
        <UploadButton style={{ marginTop: 8, padding: '13px 21px' }}>
          {'อัพโหลดใหม่'}
          <input
            type="file"
            accept="video/mp4,video/x-m4v,video/*"
            name="vid"
            onChange={e => {
              props.confirmUploadVideo(e.target.files)
            }}
          />
        </UploadButton>
      </Container>
    )
  }
  return (
    <Container>
      <UploadButton style={{ padding: '21px 13px', fontSize: '1.428em' }}>
        {props.videoFile ? (
          <div>
            <Image src={CLOUD_ICON} srcHD={CLOUDE_ICON_2X} />
            <br />
            <br />
            {props.videoFile.name}
            <br />
            {`~${props.videoFile.size / 1000000} MB`}
          </div>
        ) : (
          <div>
            <Image src={CLOUD_ICON} srcHD={CLOUDE_ICON_2X} />
            <br />
            <br />
            {`อัพโหลดคลิปวีดีโอ`}
            <br />
            {`ขนาดไม่เกิน 300MB`}
          </div>
        )}

        <input
          type="file"
          accept="video/mp4,video/x-m4v,video/*"
          name="vid"
          onChange={e => props.setFiles(e.target.files)}
        />
      </UploadButton>
      <br />
      <Button
        fluid
        disabled={!props.videoFile || props.loading < 100}
        onClick={props.confirmUploadVideo}
      >
        {props.loading < 100 ? `กำลังอัพโหลด... (${typeof props.loading === 'number' ? props.loading.toFixed(2) : ''} %)` : 'อัพโหลด'}
      </Button>
    </Container>
  )
}
