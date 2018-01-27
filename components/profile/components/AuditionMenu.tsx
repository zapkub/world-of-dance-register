import * as React from 'react'
import styled from 'styled-components'
import { Text } from '../../Text'
import { DefaultViewport } from '../../Viewport'
import { Button } from '../../Button'
import theme from '../../theme'
import routes from '../../../routes'
import bp from 'styled-components-breakpoint'
import { AuditionInfoList } from '../../../i18n/th-th'

interface AuditionMenuPropTypes {
  user?: User
  isConfirmList?: {
    junior?: any
    junior_team?: any
    upper?: any
    upper_team?: any
    team?: any
  }
}

const AuditionItemContainer = styled.div`
  ${bp('mobile')`
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 34px;

    .audition-menu__button {
      width: 100%;
    }
  `} ${bp('tablet')`
    width: calc(100% / 3);
    padding: 0 13px;
    .audition-menu__button {
      
    }
  `} ${bp('desktop')`
    padding: 0 ${55 / 2}px;
  `} display: flex;
  flex-direction: column;
  &:nth-chid-first(1) {
    padding-left: 0;
  }
  &:nth-chid-last(1) {
    padding-right: 0;
  }
  h1 {
    font-family: 'WOD', 'Kanit', sans-serif;
    color: ${theme.blue};
    font-size: ${50 / 14}em;
    line-height: 1.2;
    font-weight: bold;
    text-transform: uppercase;
  }
  h2 {
    margin: 13px 0;
    font-family: 'WOD', 'Kanit', sans-serif;
    font-size: 1.4rem;
    color: ${theme.blue};
  }
  .age-label {
    font-size: 1.28571rem;
    font-weight: normal;
  }
  .audition-menu-description__wrapper {
    margin: 21px 0;
    font-size: 1.1428rem;
    flex: 1 1 auto;
  }
`
const AuditionMenuContainer = styled(DefaultViewport)`
  display: flex;
  align-items: stetch;
  ${bp('mobile')`
    flex-direction: column;
  `} ${bp('tablet')`
    flex-direction: row;
  `};
`
const AuditionItem = (props: AuditionInfo & { isConfirmList?: any }) => (
  <AuditionItemContainer className="audition-menu__item">
    <h1 className="audition-menu__title">{props.title}</h1>
    <div className='audition-menu-description__wrapper'>
      <h2 className="audition-menu__subtitle">{props.subtitle}</h2>
      <Text
        className="age-label"
        dangerouslySetInnerHTML={{ __html: props.ageLabel }}
      />
      <Text
        className="member-amount-label"
        style={{ fontWeight: 'bold' }}
        dangerouslySetInnerHTML={{ __html: props.memberAmountLabel }}
      />
      <Text
        className="audition-menu__description"
        dangerouslySetInnerHTML={{ __html: props.description }}
      />
    </div>
    <routes.Link
      route={'register'}
      params={{ type: props.title.toLowerCase() }}
    >
      <a>
        <Button fluid className="audition-menu__button">
          {props.isConfirmList[props.title.toLowerCase()]
            ? 'แก้ไขใบสมัคร'
            : 'สมัครออดิชั่น'}
        </Button>
      </a>
    </routes.Link>
    {props.title !== 'Team' ? (
      <routes.Link
        route={'register'}
        params={{ type: props.title.toLowerCase() + '_team' }}
      >
        <a>
          <Button
            fluid
            style={{ marginTop: 8 }}
            className="audition-menu__button"
          >
            <span
              dangerouslySetInnerHTML={{
                __html: props.isConfirmList[props.title.toLowerCase() + '_team']
                  ? 'แก้ไขใบสมัคร<br />แบบมากกว่า 1 คน'
                  : 'สมัครออดิชั่น<br/>แบบมากกว่า 1 คน'
              }}
            />
          </Button>
        </a>
      </routes.Link>
    ) : <Button style={{marginTop: 8, opacity: 0}} disabled  className="audition-menu__button">{"สมัครออดิชั่น"}<br />{"มากกว่า"}</Button>}
  </AuditionItemContainer>
)
export default class AuditionMenu extends React.Component<
  AuditionMenuPropTypes,
  {}
> {
  render() {
    return (
      <AuditionMenuContainer style={{ paddingTop: 0 }}>
        {AuditionInfoList.map(audition => (
          <AuditionItem
            {...audition}
            isConfirmList={this.props.isConfirmList || {}}
            key={audition.title}
          />
        ))}
      </AuditionMenuContainer>
    )
  }
}
