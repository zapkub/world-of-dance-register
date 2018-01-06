import * as React from 'react'
import { Button } from '../../Button'
import { Image } from '../../Logo'
import styled from 'styled-components'
import theme from '../../theme';

const CLOUD_ICON = '/static/images/cloud-upload-icon.png'
const CLOUDE_ICON_2X = '/static/images/cloud-upload-icon@2x.png'

const UploadButton = styled.div`
  position: relative;
  text-align: center;
  height: auto;
  font-family: 'WOD', 'Kanit', sans-serif;
  padding: 21px 13px;
  background: none;
  border: 2px solid ${theme.blue};
  color: ${theme.blue};
  font-size: 1.428em;
  input {
    position: absolute;
    top:0;
    right:0;
    left:0;
    bottom:0;
    width: 100%;
    opacity: 0;
  }
`
const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
`
export default (props: WithVideoUploadPropType) => {
  return (
    <Container>
      <UploadButton>
        <Image src={CLOUD_ICON} srcHD={CLOUDE_ICON_2X} />
        <br />
        <br />
        {`อัพโหลดคลิปวีดีโอ`}
        <br />
        {`ขนาดไม่เกิน 300MB`}
        <input
          type="file"
          accept="video/mp4,video/x-m4v,video/*"
          name="vid"
          onChange={e => props.setFiles(e.target.files)}
        />
      </UploadButton>
      <br />
      <Button fluid disabled onClick={props.confirmUploadVideo}>
      {'อัพโหลด'}
      </Button>
    </Container>
  )
}
