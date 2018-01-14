import * as React from 'react'
import styled from 'styled-components'
import { Text } from '../../Text'
import { DefaultViewport } from '../../Viewport'
import { Button } from '../../Button'
import theme from '../../theme'
import routes from '../../../routes'
import bp from 'styled-components-breakpoint'

const AuditionInfoList: AuditionInfo[] = [
  {
    title: 'Junior',
    subtitle: 'เด็ก',
    ageLabel: 'อยู่ในช่วงระหว่างอายุ 8-16 ปี',
    memberAmountLabel: 'จำนวนผู้เข้าแข่งขัน 1-20 คน',
    description: `ประเภทเด็ก สามารถมาในรูปแบบเดี่ยวและกลุ่ม โดยสมาชิกในกลุ่มจะต้องไม่เกิน 20 คน ไม่จำกัดเพศและสไตล์การเต้นใดๆทั้งสิ้น โดยผู้เข้าสมัครแข่งขันประเภทเด็ก จะต้องมีอายุระหว่าง 8-16 ปี (เกิดระหว่าง พ.ศ. 2545 – พ.ศ. 2553)`
  },
  {
    title: 'Upper',
    subtitle: 'บุคคลทั่วไป',
    ageLabel: 'อายุ 17 ปี ขึ้นไป',
    memberAmountLabel: 'จำนวนผู้เข้าแข่งขัน 1-4 คน',
    description: `ประเภทบุคคลทั่วไป สามารถมาในรูปแบบเดี่ยวและกลุ่ม โดยถ้าเป็นกลุ่ม สมาชิกในกลุ่มจะต้องไม่เกิน 4 คน ไม่จำกัดเพศและสไตล์การเต้นใดๆทั้งสิ้น โดยผู้เข้าสมัครแข่งขันประเภทบุคคลทั่วไป จะต้องมีอายุ 17 ปีขึ้นไป (ผู้ที่เกิดในปี พ.ศ. 2544 และ ผู้ที่เกิดก่อนปี พ.ศ.2544)`
  },
  {
    title: 'Team',
    subtitle: 'กลุ่ม',
    ageLabel: 'อายุ 17 ปี ขึ้นไป',
    memberAmountLabel: 'จำนวนผู้เข้าแข่งขันในกลุ่ม 5-20 คน',
    description: `ประเภทกลุ่ม ต้องมีสมาชิกในกลุ่มไม่ต่ำกว่า 5 คน และจะต้องไม่เกิน 20 คน ไม่จำกัดเพศและสไตล์การเต้นใดๆทั้งสิ้น  โดยผู้เข้าสมัครแข่งขันประเภทกลุ่ม จะต้องมีอายุ 17 ปีขึ้นไปทุกคน (ผู้ที่เกิดในปี พ.ศ. 2544 และ ผู้ที่เกิดก่อนปี พ.ศ.2544)`
  }
]

interface AuditionInfo {
  title: string
  subtitle: string
  description: string
  ageLabel: string
  memberAmountLabel: string
}

interface AuditionMenuPropTypes {
  user?: User
}

const AuditionItemContainer = styled.div`
  ${bp('mobile')`
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 34px;

    .audition-menu__button {
      width: 100%;
    }
  `}
  ${bp('tablet')`
    width: calc(100% / 3);
    padding: 0 13px;
    .audition-menu__button {
      
    }
  `}
  ${bp('desktop')`
    padding: 0 ${55 / 2}px;
  `}
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
    font-size: 1.28571rem;
    font-weight: normal;
  }
  .audition-menu__description {
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
  `}

  ${bp('tablet')`
    flex-direction: row;
  `}
`
const AuditionItem = (props: AuditionInfo) => (
  <AuditionItemContainer>
    <h1>{props.title}</h1>
    <h2>{props.subtitle}</h2>
    <Text
      className="age-label"
      dangerouslySetInnerHTML={{ __html: props.ageLabel }}
    />
    <Text
      className="audition-menu__description"
      dangerouslySetInnerHTML={{ __html: props.description }}
    />
    <routes.Link
      route={'register'}
      params={{ type: props.title.toLowerCase() }}
    >
      <a>
        <Button fluid className='audition-menu__button'>{'สมัครออดิชั่น'}</Button>
      </a>
    </routes.Link>
    {props.title !== 'Team' ? 
    <routes.Link
      route={'register'}
      params={{ type: props.title.toLowerCase()+ '_team' }}
    >
      <a>
        <Button fluid style={{marginTop: 8}} className='audition-menu__button'>{'สมัครออดิชั่น มากกว่า 1 คน'}</Button>
      </a>
    </routes.Link> : null }
  </AuditionItemContainer>
)

export default class AuditionMenu extends React.Component {
  render() {
    return (
      <AuditionMenuContainer style={{ paddingTop: 0 }}>
        {AuditionInfoList.map(audition => (
          <AuditionItem {...audition} key={audition.title} />
        ))}
      </AuditionMenuContainer>
    )
  }
}
