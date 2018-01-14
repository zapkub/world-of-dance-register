import styled, { css } from 'styled-components'
import * as React from 'react'
import theme from './theme'
import bp from 'styled-components-breakpoint'

const fluid = css`
  display: block;
  width: 100%;
  box-sizing: border-box;
`
export const UploadButton = styled.div`
  position: relative;
  text-align: center;
  height: auto;
  font-family: 'WOD', 'Kanit', sans-serif;
  background: none;
  border: 2px solid ${theme.blue};
  color: ${theme.blue};


  input {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    opacity: 0;
  }
`
const ButtonRoot = css`
  font-family: 'WOD', 'Kanit', sans-serif;
  font-weight: 500;
  padding: 0px 21px;
  min-height: 48px;
  border: none;
  min-width: 250px;
  font-size: 14px;
  cursor: pointer;
  ${bp('tablet')`
    min-width: 0;
  `}

  &:focus {
    outline: none;
    box-shadow: 0 0 4px ${theme.blue};
  }
`

const FacebookButtonComponent = styled.button`
  ${ButtonRoot};
  background-color: #3c5193;
  color: white;
  height: 50px;
  padding: 0 38px;
  border-radius: 8px;
  font-family: 'WOD', 'Thonburi', 'Tahoma', sans-serif;
  font-size: 1.285em;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`
export const FacebookButton = (
  props: React.ButtonHTMLAttributes<{ fluid: boolean }>
) => <FacebookButtonComponent>{props.children}</FacebookButtonComponent>

interface ButtonPropTypes extends React.ButtonHTMLAttributes<any> {
  fluid?: boolean
  loading?: boolean
}
const ButtonComponent = styled.button`
  ${ButtonRoot} ${(props: ButtonPropTypes) =>
      props.fluid ? fluid : ''} border: 2px solid ${theme.blue};
  color: ${theme.blue};
  background: none;
  font-size: 1.428em;

  &:hover {
    background-color: ${theme.blue};
    color: white;
  }
  &:disabled {
    border-color: ${theme.borderGray};
    color: ${theme.borderGray};
    pointer-events: none;
    cursor: default;
  }
`
const LoadingSpinner = () => (
  <div className="spinner" style={{ margin: '0 auto'}}>
    <div className="rect1" />
    <div className="rect2" />
    <div className="rect3" />
    <div className="rect4" />
    <div className="rect5" />
  </div>
)
export const Button = (props: ButtonPropTypes) => {
  return (
    <ButtonComponent disabled={props.disabled} onClick={props.onClick} fluid={props.fluid} className={props.className} style={props.style}>
      {!props.loading ? props.children : <LoadingSpinner />}
    </ButtonComponent>
  )
}
