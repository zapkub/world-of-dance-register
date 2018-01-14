import * as React from 'react'
import styled from 'styled-components'
import { LogoOneHd, Logo, LogoOneHdSmall } from './Logo'
import Link from 'next/link'
import theme, { MENUBAR_HEIGHT } from './theme'
import { DefaultViewport } from './Viewport'
import MenuListData from './landing/components/MenuListData'
import routes from '../routes'
import bp from 'styled-components-breakpoint'

const MenubarContainer = styled.div`
  height: ${MENUBAR_HEIGHT}px;
  position: absolute;
  top:0;
  left:0;
  right:0;
`
const MenubarContainerWithStick = styled(MenubarContainer)`
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  opacity: 0;
  height: auto;
  z-index: 100;
  background-color: white;
  will-change: opacity;
  transition: 0.2222s all ease-in-out;
  pointer-events: none;
  &.show {
    opacity: 1;
    pointer-events: all;
  }
  .stick-menubar__top {
    background-color: ${theme.blackBlue};
  }
  .menu-toggle {
    position: absolute;
    font-family: 'WOD', sans-serif;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    font-weight: bold;
    font-size: 1.128rem;
    color: ${theme.blue};
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
    ${bp('mobile')`
      display: block;
    `} ${bp('desktop')`
      display: none;
    `};
  }
  .stick-menubar__content {
    display: flex;
    align-items: center;
    justify-content: stetch;
    width: 100%;
    height: ${MENUBAR_HEIGHT}px;
  }
  .stick-menubar__content-inner {
    position: relative;
    display: flex;
    flex-direction: row;
    ${bp('mobile')`
      align-item: center;
      justify-content: center;
    `} ${bp('tablet')`
      justify-content: flex-start;
    `};
  }
  &.noFixed {
    position: relative;
  }
`

const MenuListWrapper = styled.div`
  display: flex;
  ${bp('mobile')`
    position: fixed;
    top:0;
    right:0;
    left:0;
    bottom:0;
    background: white;
    margin: 0 0;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    opacity: 0;
    pointer-events: none;
    z-index:99;
    a {
      font-size: 1.728rem;
      line-height: 1.71em;
    }
    &.visible {
      opacity: 1;
      pointer-events: all;
    }
  `} 
  
  ${bp('tablet')`
    margin: 0 38px;
    flex-direction: row;
    align-items: center;
    position: relative;
    opacity: 1;
    height: auto;
    pointer-events: inherit;
    a {
      font-size: 1.1rem;
    }
  `};

  .close-button {
    position: absolute;
    top: 13px;
    right: 13px;
    font-size: 2rem;
    ${bp('mobile')`
      display: block;
    `}
    ${bp('tablet')`
      display: none;
    `}
  }
`
const MenuListItem = styled.div`
  font-weight: bold;
  font-family: 'WOD', 'Thonburi', 'Thonburi', sans-serif;
  margin: 0 ${21 / 2}px;
`
const MenuList = (
  props: React.HTMLAttributes<any> & { onClose: () => void }
) => (
  <MenuListWrapper className={props.className}>
    <div className='close-button' onClick={props.onClose}>
      <i className="far fa-times-circle" />
    </div>
    {MenuListData.map((item, key) => (
      <MenuListItem key={key} onClick={props.onClose}>
        {item.id !== 'audition' ? (
          <Link href={`/#${item.id}`}>
            <a >{item.label}</a>
          </Link>
        ) : (
          <routes.Link route="profile">
            <a onClick={props.onClose}>{item.label}</a>
          </routes.Link>
        )}
      </MenuListItem>
    ))}
  </MenuListWrapper>
)
interface MenubarPropTypes {
  noSticky?: boolean
  noFixed?: boolean
}
interface MenubarStateTypes {
  isStickToTop?: boolean
  isMenuVisible?: boolean
}

export default class Menubar extends React.Component<
  MenubarPropTypes,
  MenubarStateTypes
> {
  constructor(props) {
    super(props)
    this.state = {
      isStickToTop: false,
      isMenuVisible: false
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
      if (scrollPositionY + 20 > heightValue ) {
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
        className={`${
          this.state.isStickToTop || this.props.noSticky ? 'show' : ''
        } ${this.props.noFixed ? 'noFixed' : ''}`}
        key="stick-menubar"
      >
        <div className="stick-menubar__top">
          <LogoOneHdSmall style={{ margin: 8 }} />
        </div>
        <div className="stick-menubar__content">
          <DefaultViewport style={{ width: '100%', padding: 0 }}>
            <div className="stick-menubar__content-inner">
              <div
                className="menu-toggle"
                onClick={() =>
                  this.setState({ isMenuVisible: !this.state.isMenuVisible })
                }
              >
                {'MENU'}
              </div>
              <routes.Link route="index">
                <a>
                  <Logo />
                </a>
              </routes.Link>
              <MenuList
                onClose={() => this.setState({ isMenuVisible: false })}
                className={this.state.isMenuVisible ? 'visible' : ''}
              />
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
