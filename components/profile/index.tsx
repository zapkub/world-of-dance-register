import * as React from 'react'
import { compose } from 'recompose'
import withRequiredAuth from '../../utils/withAuthRequired'
import withVideoUpload from '../withVideoUpload'
import ProfileInfoForm from './components/ProfileInfoForm';
import Menubar from '../Menubar'
interface ProfilePagePropTypes
  extends WithVideoUploadPropType,
    WithSessionPropTypes {}

class ProfilePage extends React.Component<ProfilePagePropTypes, any> {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <Menubar noSticky />
        <ProfileInfoForm onChange={() => {}} {...this.props.user} />
        <input
          type="file"
          accept="video/mp4,video/x-m4v,video/*"
          name="vid"
          onChange={e => this.props.setFiles(e.target.files)}
        />
        <button onClick={this.props.confirmUploadVideo}>submit</button>
      </div>
    )
  }
}

export default compose(withRequiredAuth('login'), withVideoUpload)(ProfilePage)
