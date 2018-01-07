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

const TextInputWrapper = styled.div`
  margin: 8px 0;
  .TextInput__input {
    min-width: 320px;
  }
`
const TextInputLabel = styled.label`
  font-size: 1rem;
  line-height: 1.7128em;
  font-weight: bold;
  display: inline-block;
  width: 290px;
`
export const TextInputWithLabel = (props: {
  label: string
  onChange: (e) => void
  value: any
}) => {
  return (
    <TextInputWrapper>
      <TextInputLabel>{props.label}</TextInputLabel>
      <TextInput
        className="TextInput__input"
        onChange={props.onChange}
        value={props.value}
      />
    </TextInputWrapper>
  )
}

const Container = styled.div`
  border-radius: 4px;
  display: inline-block;
  color: ${theme.blue};
  font-size: 1.5em;
  position: relative;
`
// ghost native input for Form input
const InputCheck = styled.input`
  opacity: 0;
  position: absolute;
`
interface CheckboxPropTypes {
  className?: any
  style?: any
  onClick?: any
  type?: any
  checked?: any
  name?: any
}
export const Checkbox = ({
  className,
  style,
  onClick,
  type,
  checked,
  name
}: CheckboxPropTypes) => {
  return (
    <Container className={className} style={style} onClick={onClick}>
      {checked ? (
        <i className="far fa-check-square" />
      ) : (
        <i className="far fa-square" />
      )}
      <InputCheck type="checkbox" name={name} checked={checked || false} />
    </Container>
  )
}
