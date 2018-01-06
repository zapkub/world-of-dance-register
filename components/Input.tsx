import styled, { css, StyledFunction } from 'styled-components'
import * as React from 'react'
import theme from './theme'

const fluid = css`
  display: block;
  width: 100%;
  box-sizing: border-box;
`
const RootInput = css`
  border: 1px solid ${theme.borderGray};
  font-size: 1.14285rem;
  padding: 13px 8px;
  &:focus {
    outline: 2px ${theme.blue} solid;
    box-shadow: 0 0 4px ${theme.blue};
  }
`

interface TextInputMultipleLinePropTypes
  extends React.TextareaHTMLAttributes<{ value: string }> {
  fluid?: boolean
}

export const TextInputMultipleLine: React.SFC<
  TextInputMultipleLinePropTypes
> = styled.textarea`
  ${RootInput} ${(props: { fluid: boolean }) =>
      props.fluid ? fluid : ''} resize: none;
` as any

interface TextInputPropTypes
  extends React.InputHTMLAttributes<{ value: string }> {
  fluid?: boolean
}
export const TextInput: React.SFC<TextInputPropTypes> = styled.input`
  ${RootInput} ${(props: { fluid: boolean }) => (props.fluid ? fluid : '')};
` as any

const TextInputWrapper = styled.div``
export const TextInputWithLabel = (props: {
  label: string
  onChange: (e) => void
  value: any
}) => {
  return (
    <TextInputWrapper>
      {props.label}
      <TextInput onChange={props.onChange} value={props.value} />
    </TextInputWrapper>
  )
}
