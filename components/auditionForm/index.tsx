import * as React from 'react'
import { graphql, withApollo } from 'react-apollo'
import { compose, withProps } from 'recompose'
import Menubar from '../Menubar'
import withVideoUpload from '../withVideoUpload'
import AuditionForm from './components/AuditionForm'
import withFormState, { defaultFormInfo } from './auditionForm.state'
import gql from 'graphql-tag'
import withAuthRequired from '../../utils/withAuthRequired';


const AuditionFormWithData = compose<{ url: any }, { url: any }>(
  withAuthRequired('/login'),
  withVideoUpload,
  withFormState
)(AuditionForm)

export default props => {
  return (
    <div>
      <Menubar noSticky />
      <AuditionFormWithData url={props.url} />
    </div>
  )
}
