import * as React from 'react'
import { Button, UploadButton } from '../../Button'
import { Image } from '../../Logo'
import styled from 'styled-components'
import theme from '../../theme'

const CLOUD_ICON = '/static/images/cloud-upload-icon.png'
const CLOUDE_ICON_2X = '/static/images/cloud-upload-icon@2x.png'

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
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
            <div dangerouslySetInnerHTML={{__html: 'กำลังอยู่ระหว่างประมวลผล คลิปวีดีโอ<br />แบบฟอร์มถูกบันทึกไว้แล้ว คุณสามารถ Reload หน้านี้ได้'}} />
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
                To view this video please enable JavaScript, and consider
                upgrading to a web browser that
                <a
                  href="http://videojs.com/html5-video-support/"
                  target="_blank"
                >
                  supports HTML5 video
                </a>
              </p>
            </video>
          </UploadButton>
        )}
        <Button fluid onClick={props.onResetVideoURL} style={{ marginTop: 8 }}>
          {'อัพโหลดใหม่'}
        </Button>
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
        disabled={!props.videoFile}
        onClick={props.confirmUploadVideo}
      >
        {'อัพโหลด'}
      </Button>
    </Container>
  )
}
