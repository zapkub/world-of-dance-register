import styled, { css, StyledFunction } from 'styled-components'
import * as React from 'react'
import theme from './theme'
import DatePicker from 'react-datepicker'
import * as moment from 'moment'
import { withState, compose, lifecycle } from 'recompose'
const range = require('range')

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
  &:disabled {
    background: white;
    cursor: not-allowed;
  }
`

interface TextInputMultipleLinePropTypes
  extends React.TextareaHTMLAttributes<{ value: string }> {
  fluid?: boolean
}

export const TextInputMultipleLine: React.SFC<
  TextInputMultipleLinePropTypes
> = styled.textarea`
  ${RootInput};
  ${(props: { fluid: boolean }) => (props.fluid ? fluid : '')};
  resize: none;
` as any

interface TextInputPropTypes
  extends React.InputHTMLAttributes<{ value: string }> {
  fluid?: boolean
}
export const TextInput: React.SFC<TextInputPropTypes> = styled.input`
  ${RootInput};
  ${(props: { fluid: boolean }) => (props.fluid ? fluid : '')};
` as any

export const TextInputWrapper = styled.div`
  margin: 8px 0;
  .TextInput__input {
    min-width: 320px;
  }
  .react-datepicker-wrapper {
    input {
      ${RootInput};
    }
  }
  .input-row-wrap {
    display: flex;
    align-items: center;
    .input__selector {
      margin-right: 8px;
    }
  }
`
export const TextInputLabel = styled.label`
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
  type?: any
  placeholder?: any
  style?: any
}) => {
  return (
    <TextInputWrapper style={props.style}>
      <TextInputLabel dangerouslySetInnerHTML={{ __html: props.label }} />
      <TextInput
        placeholder={props.placeholder}
        className="TextInput__input"
        onChange={props.onChange}
        value={props.value}
        type={props.type || 'text'}
      />
    </TextInputWrapper>
  )
}
interface DateInputProp {
  label: string
  selected: any
  onChange: any
  isMount?: any
  disabled?: boolean
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
      <InputCheck
        type="checkbox"
        name={name}
        onChange={() => {}}
        checked={checked || false}
      />
    </Container>
  )
}

const Select = styled.select`
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: calc(100% - 0px);
  height: 100%;
  -webkit-appearance: none;
`

const ValueInput = styled(TextInput)`
  text-overflow: ellipsis;
  padding-right: 20px;
  &:disabled {
    opacity: 1;
    color: ${props => props.theme.matteBlack};
  }
  -webkit-appearance: none;
`
const Option = styled.option`
  width: auto;
`
const UISelectContainer = styled.div`
  position: relative;
  // margin: 0 3px;
  left: 0;
  right: 0;
`
const Arrow = styled.span`
  border-color: #999 transparent transparent;
  border-style: solid;
  border-width: 5px 5px 2.5px;
  display: inline-block;
  height: 0;
  width: 0;
  position: absolute;
  right: 10px;
  top: 50%;
  pointer-events: none;
  transform: translateY(-50%);
`
interface SelectInputPropTypes {
  value?: any
  onChange?: (value: any) => void
  containerStyle?: any
  placeholder?: string
  disabled?: boolean
  name?: string
  options?: any[]
}
export class SelectorInput extends React.Component<SelectInputPropTypes, any> {
  onChange(e) {
    this.props.onChange(e.target.value)
  }
  get selectedItem() {
    for (const item of this.props.options) {
      if (this.props.value === item.value) {
        return item
      }
    }
    return { label: '' }
  }
  render() {
    const selectedValue = this.props.value || this.props.placeholder
    return (
      <UISelectContainer
        className="input__selector"
        style={this.props.containerStyle}
      >
        <ValueInput
          disabled
          placeholder={this.props.placeholder}
          fluid
          readOnly
          value={this.selectedItem.label}
        />
        <Select
          value={selectedValue}
          disabled={this.props.disabled}
          onChange={this.onChange.bind(this)}
          name={this.props.name || 'name-is-not-set'}
        >
          <option value={this.props.placeholder} disabled>
            {this.props.placeholder}
          </option>
          {this.props.options.map(option => (
            <Option value={option.value} key={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
        <Arrow />
      </UISelectContainer>
    )
  }
}

export const DateInputWithLabel = compose<DateInputProp, DateInputProp>(
  withState('isMount', 'setMount', false),
  lifecycle<any, any>({
    componentDidMount() {
      this.props.setMount(true)
    }
  })
)((props: DateInputProp) => {
  if (!props.isMount) {
    return <div />
  }
  const day = props.selected.date()
  const month = props.selected.month() + 1
  const year = props.selected.year() + 543
  const onDateChange = (day, month, year) => {
    const value = `${moment(month, 'MM').format('MMMM')} ${day}, ${year - 543}`
    props.onChange(moment(new Date(value)))
  }
  return (
    <TextInputWrapper>
      <TextInputLabel dangerouslySetInnerHTML={{ __html: props.label }} />
      {/* <div style={{ display: 'inline-block' }}>
        <DatePicker selected={props.selected} onChange={props.onChange} />
      </div> */}
      <div className="input-row-wrap">
        <SelectorInput
          value={day}
          onChange={value => onDateChange(value, month, year)}
          options={range
            .range(1, 32)
            .map(item => ({ value: item, label: item + '' }))}
          name="วัน"
        />
        <SelectorInput
          value={month}
          onChange={value => onDateChange(day, value, year)}
          options={range.range(1, 13).map(item => ({
            value: item,
            label: moment(item, 'MM').format('MMMM')
          }))}
          name="วัน"
        />
        <SelectorInput
          value={year}
          onChange={value => onDateChange(day, month, value)}
          options={range
            .range(2400, 2565)
            .map(item => ({ value: item, label: item }))}
          name="วัน"
        />

        <span style={{ color: theme.blue, marginLeft: 8, whiteSpace: 'pre' }}>
          {'อายุ ' + (moment().year() - props.selected.year()) + ' ปี'}
        </span>
      </div>
    </TextInputWrapper>
  )
})

export const SelectorInputWithLabel = (
  props: SelectInputPropTypes & { label?: string }
) => {
  return (
    <TextInputWrapper>
      <TextInputLabel>{props.label}</TextInputLabel>
      <div style={{ display: 'inline-block' }}>
        <SelectorInput {...props} />
      </div>
    </TextInputWrapper>
  )
}
