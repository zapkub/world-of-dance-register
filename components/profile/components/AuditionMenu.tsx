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
  userExtraHead?: boolean
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
    margin: 34px auto 0 auto;
    max-width: 480px;

    .audition-menu__button {
      width: 100%;
    }
  `};
  ${bp('tablet')`
    width: calc(100% / 3);
    padding: 0 13px;
    .audition-menu__button {
      
    }
  `};
  ${bp('desktop')`
    padding: 0 ${55 / 2}px;
  `};
  display: flex;
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
    font-size: 1.28571em;
    font-weight: normal;
  }
  .sub-label {
    font-size: 1em;
  }
  .audition-menu-description__wrapper {
    margin: 21px 0;
    font-size: 1.1428em;
    flex: 1 1 auto;
  }
`
const AuditionMenuContainer = styled(DefaultViewport)`
  display: flex;
  align-items: stetch;
  ${bp('mobile')`
    flex-direction: column;
  `};
  ${bp('tablet')`
    flex-direction: row;
  `};
  .render-head {
    width: 100%;
    position: relative;
    height: 100px;
    img {
      position: absolute;
      left:50%;
      width: 400px;
      transform: translateX(-50%);
    }
  }
`
const AuditionItem = (
  props: AuditionInfo & { renderHead?: any; isConfirmList?: any }
) => (
  <AuditionItemContainer className="audition-menu__item">
    {props.renderHead ? (
      props.renderHead()
    ) : (
      <h1 className="audition-menu__title">{props.title}</h1>
    )}
    <div className="audition-menu-description__wrapper">
      <h2 className="audition-menu__subtitle">{props.subtitle}</h2>
      <Text
        className="age-label"
        dangerouslySetInnerHTML={{ __html: props.ageLabel }}
      />
      <Text
        className="member-amount-label"
        style={{  }}
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
            ? '>> แก้ไขใบสมัคร <<'
            : '>> สมัครออดิชั่น <<'}
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
              style={{ lineHeight: 0 }}
              dangerouslySetInnerHTML={{
                __html: props.isConfirmList[props.title.toLowerCase() + '_team']
                  ? '>> แก้ไขใบสมัคร <<<br /><span class="sub-label">แบบมากกว่า 1 คน</span>'
                  : '>> สมัครออดิชั่น <<<br/> <span class="sub-label">แบบมากกว่า 1 คน</span>'
              }}
            />
          </Button>
        </a>
      </routes.Link>
    ) : (
      <Button
        style={{ marginTop: 8, opacity: 0 }}
        disabled
        className="audition-menu__button"
      >
        <span
          style={{ lineHeight: 0 }}
          dangerouslySetInnerHTML={{
            __html: props.isConfirmList[props.title.toLowerCase() + '_team']
              ? '>> แก้ไขใบสมัคร <<<br /><span class="sub-label">แบบมากกว่า 1 คน</span>'
              : '>> สมัครออดิชั่น <<<br/> <span class="sub-label">แบบมากกว่า 1 คน</span>'
          }}
        />
      </Button>
    )}
  </AuditionItemContainer>
)
export default class AuditionMenu extends React.Component<
  AuditionMenuPropTypes,
  {}
> {
  render() {
    return (
      <AuditionMenuContainer className='auditon-menu__container' style={{ paddingTop: 0 }}>
        {AuditionInfoList.map(audition => {
          const renderHead = () => (
            <div className='render-head'>
              <img src={`/static/images/${audition.title.toLocaleLowerCase()}-header@2x.png`} />
            </div>
          )
          return (
            <AuditionItem
              renderHead={!this.props.userExtraHead ? null : renderHead}
              {...audition}
              isConfirmList={this.props.isConfirmList || {}}
              key={audition.title}
            />
          )
        })}
      </AuditionMenuContainer>
    )
  }
}
