import * as React from 'react'
import styled from 'styled-components'
import { LogoOneHd, Logo, LogoOneHdSmall } from './Logo'
import Link from 'next/link'
import theme from './theme'
import { DefaultViewport } from './Viewport'
import MenuListData from './landing/components/MenuListData'
import routes from '../routes'

export const MENUBAR_HEIGHT = 83

const MenubarContainer = styled.div`
  height: ${MENUBAR_HEIGHT}px;
`
const MenubarContainerWithStick = styled(MenubarContainer)`
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  transform: translateY(-100%);
  opacity: 0;
  height: auto;
  z-index: 100;
  background-color: white;
  will-change: transform, opacity;
  transition: 0.2222s all ease-in-out;
  &.show {
    transform: translateY(0);
    opacity: 1;
  }
  .stick-menubar__top {
    background-color: ${theme.blackBlue};
  }
  .stick-menubar__content {
    display: flex;
    align-items: center;
    justify-content: stetch;
    width: 100%;
    height: ${MENUBAR_HEIGHT}px;
  }
  .stick-menubar__content-inner {
    display: flex;
    flex-direction: row;
  }
`

const MenuListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 38px;
`
const MenuListItem = styled.div`
  font-weight: bold;
  font-family: 'WOD', 'Thonburi', 'Thonburi', sans-serif;
  margin: 0 ${21 / 2}px;
`
const MenuList = () => (
  <MenuListWrapper>
    {MenuListData.map((item, key) => (
      <MenuListItem key={key}>
        {item.id !== 'audition' ? (
          <Link href={`/#${item.id}`}>
            <a>{item.label}</a>
          </Link>
        ) : (
          <routes.Link route="profile">
            <a>{item.label}</a>
          </routes.Link>
        )}
      </MenuListItem>
    ))}
  </MenuListWrapper>
)
interface MenubarPropTypes {
  noSticky?: boolean
}
interface MenubarStateTypes {
  isStickToTop: boolean
}

export default class Menubar extends React.Component<
  MenubarPropTypes,
  MenubarStateTypes
> {
  constructor(props) {
    super(props)
    this.state = {
      isStickToTop: false
    }
    this.handleScroll = this.handleScroll.bind(this)
  }
  handleScroll() {
    /**
     * get Landing section height to transform menubar
     */
    const LandingPageDOM = document.getElementById('landing-page-section')
    if (LandingPageDOM) {
      const heightValue = LandingPageDOM.getBoundingClientRect().height
      const scrollPositionY = window.scrollY
      if (scrollPositionY > heightValue) {
        this.setState({
          isStickToTop: true
        })
      } else {
        this.setState({
          isStickToTop: false
        })
      }
    }
  }

  componentDidMount() {
    this.handleScroll()
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }
  render() {
    const Sticky = (
      <MenubarContainerWithStick
        className={this.state.isStickToTop || this.props.noSticky ? 'show' : ''}
        key="stick-menubar"
      >
        <div className="stick-menubar__top">
          <LogoOneHdSmall style={{ margin: 8 }} />
        </div>
        <div className="stick-menubar__content">
          <DefaultViewport style={{ width: '100%' }}>
            <div className="stick-menubar__content-inner">
              <Logo />
              <MenuList />
            </div>
          </DefaultViewport>
        </div>
      </MenubarContainerWithStick>
    )
    if (this.props.noSticky) {
      return Sticky
    }
    return [
      <MenubarContainer key="top-menubar">
        <LogoOneHd />
      </MenubarContainer>,
      Sticky
    ]
  }
}
