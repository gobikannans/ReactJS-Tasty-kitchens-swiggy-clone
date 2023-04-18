import {Link, withRouter} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'
import {BsMoonFill, BsBrightnessHighFill} from 'react-icons/bs'
import Popup from 'reactjs-popup'
import AppTheme from '../../context/AppTheme'

import './index.css'

const navItemsList = [
  {
    id: 'HOME',
    name: 'Home',
    link: '/',
  },
  {
    id: 'CART',
    name: 'Cart',
    link: '/cart',
  },
]

class Header extends Component {
  state = {
    showMobileView: false,
    navId: navItemsList[0].id,
  }

  onLogOut = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  onClickOpen = () => {
    this.setState({showMobileView: true})
  }

  onClickClose = () => {
    this.setState({showMobileView: false})
  }

  onMobileNav = () => {
    this.setState({showMobileView: false})
  }

  onClickNav = id => {
    localStorage.setItem('key', id)
    this.setState({navId: id})
  }

  onClickLogo = () => {
    localStorage.setItem('key', 'HOME')
  }

  render() {
    const {showMobileView, navId} = this.state

    return (
      <AppTheme.Consumer>
        {value => {
          const {activeTheme, changeTheme} = value

          const onChangeTheme = () => {
            const theme = activeTheme === 'light' ? 'dark' : 'light'
            changeTheme(theme)
          }

          const navBg = activeTheme === 'light' ? '#f8fafc' : '#313131'
          const navLinksColor =
            activeTheme === 'light'
              ? 'normal-nav-item-style'
              : 'dark-nav-item-style'
          const navColor = activeTheme === 'light' ? '#334155' : '#ffffff'
          const homePara = activeTheme === 'light' ? '#64748b' : '#94a3b8'

          return (
            <>
              <nav
                className="navbar-container"
                style={{backgroundColor: `${navBg}`}}
              >
                <div className="navbar-item-container">
                  <Link to="/" className="nav-links" onClick={this.onClickLogo}>
                    <div className="header-logo-container">
                      <img
                        src="https://res.cloudinary.com/dpjowvn70/image/upload/v1674121630/Frame_274_1x_tl2jpu.png"
                        alt="website logo"
                        className="header-logo"
                      />
                      <h1 className="header-heading">Tasty Kitchens</h1>
                    </div>
                  </Link>
                  <ul className="nav-items-list">
                    {navItemsList.map(eachItem => {
                      const onClickNav = () => {
                        this.onClickNav(eachItem.id)
                      }
                      const val = localStorage.getItem('key') || 1
                      console.log(navId)
                      const isActive = val === eachItem.id
                      const acStyle = isActive ? 'orange' : ''
                      return (
                        <li className="list-item" key={eachItem.id}>
                          <Link to={eachItem.link} className="header-links">
                            <p
                              className={`nav-style ${navLinksColor}`}
                              style={{color: `${acStyle}`}}
                              onClick={onClickNav}
                            >
                              {eachItem.name}
                            </p>
                          </Link>
                        </li>
                      )
                    })}

                    <button
                      type="button"
                      border="none"
                      onClick={onChangeTheme}
                      className="theme-btn-desktop"
                    >
                      {activeTheme === 'light' ? (
                        <BsMoonFill size={25} color="#000000" />
                      ) : (
                        <BsBrightnessHighFill size={25} color="#ffffff" />
                      )}
                    </button>

                    <Popup
                      modal
                      trigger={
                        <button type="button" className="profiles-btn">
                          <img
                            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                            alt="profile"
                            className="profile-img"
                          />
                        </button>
                      }
                      lockScroll="true"
                      repositionOnResize="true"
                      closeOnDocumentClick
                    >
                      {close => (
                        <div
                          className="popup-container"
                          style={{backgroundColor: `${navBg}`}}
                        >
                          <div className="circle-avatar">
                            <span className="avatar-text">G</span>
                          </div>
                          <h5
                            className="user"
                            style={{
                              marginTop: '10px',
                              marginBottom: '10px',
                              fontSize: '15px',
                              color: `${navColor}`,
                            }}
                          >
                            Gobi Kannan
                          </h5>
                          <p
                            className="user"
                            style={{
                              marginTop: '0px',
                              color: `${homePara}`,
                            }}
                          >
                            gk@gmail.com
                          </p>

                          <div className="profile-details">
                            <div>
                              <hr style={{color: 'grey', width: '100%'}} />
                            </div>
                            <>
                              <p
                                className="profiles-text"
                                style={{
                                  marginTop: '0px',
                                  color: `${navColor}`,
                                }}
                              >
                                Account Details
                              </p>
                            </>
                            <div>
                              <hr style={{color: 'grey', width: '100%'}} />
                            </div>
                            <p
                              className="profiles-text"
                              style={{
                                color: `${navColor}`,
                              }}
                            >
                              Your Orders
                            </p>
                            <div>
                              <hr style={{color: 'grey', width: '100%'}} />
                            </div>
                            <p
                              className="profiles-text"
                              style={{
                                color: `${navColor}`,
                              }}
                            >
                              Help & Support
                            </p>
                            <div>
                              <hr style={{color: 'grey', width: '100%'}} />
                            </div>
                            <p
                              className="profiles-text"
                              style={{
                                color: `${navColor}`,
                              }}
                            >
                              Settings
                            </p>
                            <div>
                              <hr style={{color: 'grey', width: '100%'}} />
                            </div>
                            <button
                              type="button"
                              className="close-pop-btn"
                              onClick={() => close()}
                              style={{
                                color: `${navColor}`,
                              }}
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      )}
                    </Popup>

                    <li className="list-item">
                      <button
                        type="button"
                        className="logout-btn"
                        onClick={this.onLogOut}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>

                  <button
                    type="button"
                    border="none"
                    onClick={onChangeTheme}
                    className="theme-btn-mobile"
                  >
                    {activeTheme === 'light' ? (
                      <BsMoonFill size={23} color="#000000" />
                    ) : (
                      <BsBrightnessHighFill size={23} color="#ffffff" />
                    )}
                  </button>

                  <div className="popup-mobile">
                    <Popup
                      modal
                      trigger={
                        <button type="button" className="profiles-btn">
                          <img
                            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                            alt="profile"
                            className="profile-img"
                          />
                        </button>
                      }
                      className="popup-content"
                      lockScroll="true"
                      closeOnDocumentClick
                    >
                      {close => (
                        <div
                          className="popup-container"
                          style={{backgroundColor: `${navBg}`}}
                        >
                          <div className="circle-avatar">
                            <span className="avatar-text">G</span>
                          </div>
                          <h5
                            className="user"
                            style={{
                              marginTop: '10px',
                              marginBottom: '10px',
                              fontSize: '15px',
                              color: `${navColor}`,
                            }}
                          >
                            Gobi Kannan
                          </h5>
                          <p
                            className="user"
                            style={{
                              marginTop: '0px',
                              color: `${homePara}`,
                            }}
                          >
                            gk@gmail.com
                          </p>

                          <div className="profile-details">
                            <div>
                              <hr style={{color: 'grey', width: '100%'}} />
                            </div>
                            <>
                              <p
                                className="profiles-text"
                                style={{
                                  marginTop: '0px',
                                  color: `${navColor}`,
                                }}
                              >
                                Account Details
                              </p>
                            </>
                            <div>
                              <hr style={{color: 'grey', width: '100%'}} />
                            </div>
                            <p
                              className="profiles-text"
                              style={{
                                color: `${navColor}`,
                              }}
                            >
                              Your Orders
                            </p>
                            <div>
                              <hr style={{color: 'grey', width: '100%'}} />
                            </div>
                            <p
                              className="profiles-text"
                              style={{
                                color: `${navColor}`,
                              }}
                            >
                              Help & Support
                            </p>
                            <div>
                              <hr style={{color: 'grey', width: '100%'}} />
                            </div>
                            <p
                              className="profiles-text"
                              style={{
                                color: `${navColor}`,
                              }}
                            >
                              Settings
                            </p>
                            <div>
                              <hr style={{color: 'grey', width: '100%'}} />
                            </div>
                            <button
                              type="button"
                              className="close-pop-btn"
                              onClick={() => close()}
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      )}
                    </Popup>
                  </div>

                  <button
                    type="button"
                    className="hamburger-icon-btn"
                    onClick={this.onClickOpen}
                  >
                    {activeTheme === 'light' ? (
                      <GiHamburgerMenu size={28} />
                    ) : (
                      <GiHamburgerMenu size={28} color="#ffffff" />
                    )}
                  </button>
                </div>
              </nav>

              <nav
                className="mobile-view"
                style={{backgroundColor: `${navBg}`}}
              >
                {showMobileView ? (
                  <>
                    {' '}
                    <ul className="mobile-items-list">
                      {navItemsList.map(eachItem => {
                        const onClickNav = () => {
                          this.onClickNav(eachItem.id)
                        }
                        const val = localStorage.getItem('key') || 1
                        const isActive = val === eachItem.id
                        const acStyle = isActive ? 'orange' : ''
                        return (
                          <li
                            className="list-item"
                            key={eachItem.id}
                            onClick={this.onMobileNav}
                          >
                            <Link to={eachItem.link} className="header-links">
                              <p
                                className={navLinksColor}
                                style={{color: `${acStyle}`}}
                                onClick={onClickNav}
                              >
                                {eachItem.name}
                              </p>
                            </Link>
                          </li>
                        )
                      })}
                      <button
                        type="button"
                        className="logout-btn"
                        onClick={this.onLogOut}
                      >
                        Logout
                      </button>
                    </ul>
                    <button
                      type="button"
                      className="close-icon-btn"
                      onClick={this.onClickClose}
                    >
                      <AiFillCloseCircle
                        className="close-icon"
                        style={{color: `${navColor}`}}
                      />
                    </button>{' '}
                  </>
                ) : (
                  ''
                )}
              </nav>
            </>
          )
        }}
      </AppTheme.Consumer>
    )
  }
}

export default withRouter(Header)
