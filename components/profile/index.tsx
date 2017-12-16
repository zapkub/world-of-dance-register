import * as React from 'react'
import { compose } from 'recompose'
import withRequiredAuth from '../../utils/withAuthRequired'




class ProfilePage extends React.Component<{ user: User }, any> {
  constructor(props){
    super(props)
    this.state = {
      files: []
    }
  }
  submit() {
    const formData = new FormData()
    formData.append('vid', this.state.files[0])
    var xhr = new XMLHttpRequest();
    
    xhr.open('post', '/upload', true);
    
    xhr.upload.onprogress = function(e) {
      if (e.lengthComputable) {
        var percentage = (e.loaded / e.total) * 100;
        console.log(percentage)
      }
    };
    
    xhr.onerror = function(e) {
      console.info('An error occurred while submitting the form. Maybe your file is too big');
    };
    
    xhr.onload = function() {
      console.log(this.statusText);
    };
    
    xhr.send(formData);
  }
  render() {
    return (
      <div>
        {this.props.user.facebookId}
        <input type='file' accept="video/mp4,video/x-m4v,video/*" name='vid' onChange={e => this.setState({files: e.target.files})} />
        <button onClick={this.submit.bind(this)}>submit</button>
      </div>
    )
  }
}


export default compose(
  withRequiredAuth('/')
)(ProfilePage)