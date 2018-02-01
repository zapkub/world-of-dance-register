import * as React from 'react'
import withApolloClient from '../components/withData'
import { compose, withState, withProps } from 'recompose'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Button } from '../components/Button'
import InfoViewer from '../components/InfoViewer'
import routes from '../routes'
import * as moment from 'moment'
import { injectGlobal } from 'styled-components'
import {
  SelectorInput,
  SelectorInputWithLabel,
  Checkbox
} from '../components/Input'
import { DefaultViewport } from '../components/Viewport'
injectGlobal`

.wrapper {
  margin: 0 auto;
  padding: 40px;
  max-width: 800px;
}

.table {
  margin: 0 0 40px 0;
  width: 100%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  display: table;
}
@media screen and (max-width: 580px) {
  .table {
    display: block;
  }
}

.row {
  display: table-row;
  background: #f6f6f6;
}
.row:nth-of-type(odd) {
  background: #e9e9e9;
}
.row.header {
  font-weight: 900;
  color: #ffffff;
  background: #ea6153;
}
.row.green {
  background: #27ae60;
}
.row.blue {
  background: #2980b9;
}
@media screen and (max-width: 580px) {
  .row {
    padding: 14px 0 7px;
    display: block;
  }
  .row.header {
    padding: 0;
    height: 6px;
  }
  .row.header .cell {
    display: none;
  }
  .row .cell {
    margin-bottom: 10px;
  }
  .row .cell:before {
    margin-bottom: 3px;
    content: attr(data-title);
    min-width: 98px;
    font-size: 10px;
    line-height: 10px;
    font-weight: bold;
    text-transform: uppercase;
    color: #969696;
    display: block;
  }
}

.cell {
  padding: 6px 12px;
  display: table-cell;
}
@media screen and (max-width: 580px) {
  .cell {
    padding: 2px 16px;
    display: block;
  }
}
  
`
const AUDITION_FORM_LIST_QUERY = gql`
  query($filter: FilterFindManyAuditionInformationInput) {
    auditionInfoList(filter: $filter) {
      auditionType
      _id
      title
      description
      mobileNo
      dancingStyle
      coachName
      organizationName
      videoURL
      members {
        _id
        dateOfBirth
        email
        gender
        firstname
        lastname
        mobileNo
        nickname
        profileImageURL
      }
      ownerId
      isConfirm
      height
      weight
      nationality
      origin
      relationshipType
      educationBackground
      occupation
      address
      lineId
      instagramUrl
      facebookUrl
      emergencyContactName
      emergencyContactRelationAs
      emergencyContentMobileNo
      isAlreadyTrainByInstitutionName
      isAlreadyHasEntertainingProfile
      updatedAt
      createdAt
    }
  }
`
interface AdminPagePropTypes {
  user: User
  filter: any
  setFilter: any
  auditionInfoList: AuditionInformation[]
  selectedItemId: (id: string, value: boolean) => void
  selectedItems: { [id: string]: boolean }
}
class AdminPage extends React.Component<AdminPagePropTypes, any> {
  constructor(props) {
    super(props)
    this.download = this.download.bind(this)
    this.state = {
      isPrepare: false,
      current: 0,
      total: 0,
      url: undefined
    }
  }
  download() {
    this.setState({
      isPrepare: true
    })
    const ids = Object.keys(this.props.selectedItems).map(key => key)
    const xhr = new XMLHttpRequest()
    xhr.open('post', '/documents.zip')
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    xhr.onprogress = () => {
      console.log('PROGRESS:', xhr.responseText)
      const res = (xhr.responseText.toString().split('|'))
      const result = JSON.parse(res[res.length-1])
      if(result.url) {
        result.isPrepare = false  
      }
      this.setState({
        ...result
      })
    }
    xhr.onload = () => {}
    xhr.send(
      JSON.stringify({
        ids
      })
    )
  }
  render() {
    if (!this.props.user) {
      return (
        <form action="/admin-login">
          <input name="username" placeholder="username" />
          <input name="password" placeholder="password" type="password" />
          <input type="submit" value="Login" />
        </form>
      )
    } else {
      return (
        <DefaultViewport>
          <a href="/logout">
            <Button>{'Logout'}</Button>
          </a>
          <SelectorInputWithLabel
            label="filter"
            placeholder="เลือก filter"
            onChange={this.props.setFilter}
            value={this.props.filter}
            options={[
              {
                label: 'ทั้งหมด',
                value: 'all'
              },
              {
                label: 'upper',
                value: 'upper'
              },
              {
                label: 'junior',
                value: 'junior'
              },
              {
                value: 'junior_team',
                label:'junior มากกว่า 1 คน'
              },
              {
                value: 'upper_team',
                label: 'upper มากกว่า 1 คน'
              },
              {
                value: 'team',
                label: 'team'
              }
            ]}
          />
          <div className="wrapper">
            <div className="table">
              <div className="row header">
                <div className="cell">เลือก</div>
                <div className="cell">วันที่</div>
                <div className="cell">ลำดับที่</div>
                <div className="cell">ชื่อ</div>
                <div className="cell">ประเภทการออดิชั่น</div>
                <div className="cell">จำนวน</div>
                <div className="cell">Action</div>
              </div>
              {this.props.auditionInfoList.map((info, index) => (
                <div className="row" key={info._id}>
                  <div className="cell" data-title="select">
                    <Checkbox
                      checked={this.props.selectedItems[info._id]}
                      onClick={() =>
                        this.props.selectedItemId(
                          info._id,
                          !this.props.selectedItems[info._id]
                        )
                      }
                    />
                  </div>
                  <div className="cell" data-title="Date">
                      {moment(info.createdAt).format('DD/MM/YYYY HH:mm')}
                  </div>
                  <div className="cell" data-title="Name">
                    {index + 1}
                  </div>
                  <div className="cell" data-title="Name">
                    {info.members[0].firstname + ' ' + info.members[0].lastname}
                  </div>
                  <div className="cell" data-title="Age">
                    {info.auditionType}
                  </div>
                  <div className="cell" data-title="Occupation">
                    {info.members.length}
                  </div>
                  <div className="cell" data-title="Location">
                    <routes.Link route="view" params={{ id: info._id }}>
                      <a target={'_blank'}>{'เปิดดู'}</a>
                    </routes.Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* <form action="/documents.zip" method='POST'>
            <input type='hidden' name='ids' value={Object.keys(this.props.selectedItems).map(key => key)} />
            <input type="submit" value="download" />
          </form> */}
          <Button onClick={this.download}>{'download'}</Button>
          {this.state.isPrepare
            ? `
            กำลังรวบรวมไฟล์ ${this.state.current}/${this.state.total}
          `
            : <a href={this.state.url}> {this.state.url} </a>}
        </DefaultViewport>
      )
    }
  }
}

export default compose(
  withApolloClient,
  withState('filter', 'setFilter', 'all'),
  withState('selectedItems', 'setSelectedItems', {}),
  withProps<any, any>(props => ({
    selectedItemId: (id, value) => {
      console.log(id, value)
      props.setSelectedItems({
        ...props.selectedItems,
        [id]: value
      })
    }
  })),
  graphql<{ me: User }>(
    gql`
      query {
        me {
          _id
          email
        }
      }
    `,
    {
      options: props => {
        return {
        }
      },
      props: ({ data }) => {
        return {
          user: data.me
        }
      }
    }
  ),
  graphql<any, any>(AUDITION_FORM_LIST_QUERY, {
    options: props => ({
      variables: {
        filter: {
          auditionType: props.filter === 'all' ? undefined : props.filter,
          isConfirm: true
        }
      }
    }),
    props: ({ data }) => {
      return {
        auditionInfoList: data.auditionInfoList || []
      }
    }
  })
)(AdminPage)
