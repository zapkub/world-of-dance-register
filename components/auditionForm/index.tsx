import * as React from 'react'
import { graphql, withApollo } from 'react-apollo'
import { compose, withProps } from 'recompose'
import Menubar from '../Menubar'
import withVideoUpload from '../withVideoUpload'
import AuditionForm from './components/AuditionForm'
import withFormState, { defaultFormInfo } from './auditionForm.state'
import gql from 'graphql-tag'
import withAuthRequired from '../withAuthRequired'

const AuditionFormWithData = compose<{ url: any }, { url: any }>(
  withFormState,
)(AuditionForm)

export default withAuthRequired('/login')(props => {
  return (
    <div>
      <Menubar noSticky noFixed />
      <AuditionFormWithData url={props.url} />
    </div>
  )
})
