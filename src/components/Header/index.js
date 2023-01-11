import {Link, withRouter} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiOutlineCloseCircle} from 'react-icons/ai'
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
    activeItemId: navItemsList[0].id,
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

  updateTab = tabId => {
    this.setState({activeItemId: tabId})
  }

  render() {
    const {showMobileView, activeItemId} = this.state

    return (
      <>
        <nav className="navbar-container">
          <div className="navbar-item-container">
            <div className="header-logo-container">
              <img
                src="https://res.cloudinary.com/dpjowvn70/image/upload/v1673347763/Vector1x_yu8nat.png"
                alt="website logo"
                className="header-logo"
              />
              <h1 className="header-heading">Tasty Kitchens</h1>
            </div>
            <ul className="nav-items-list">
              {navItemsList.map(eachItem => {
                const updateItem = () => {
                  this.updateTab(eachItem.id)
                }
                const isActive = eachItem.id === activeItemId
                const activeStyle = isActive
                  ? 'active-nav-item-style'
                  : 'normal-nav-item-style'
                return (
                  <Link
                    to={eachItem.link}
                    key={eachItem.id}
                    className="nav-links"
                  >
                    <li className="list-item">
                      <p className="normal-nav-item-style">{eachItem.name}</p>
                    </li>
                  </Link>
                )
              })}

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
              className="hamburger-icon-btn"
              onClick={this.onClickOpen}
            >
              <GiHamburgerMenu className="hamburger-icon" />
            </button>
          </div>
        </nav>

        <nav className="mobile-view">
          {showMobileView ? (
            <>
              {' '}
              <ul className="mobile-items-list">
                {navItemsList.map(eachItem => {
                  const isActive = eachItem.id === activeItemId
                  const activeStyle = isActive
                    ? 'active-nav-item-style'
                    : 'normal-nav-item-style'
                  return (
                    <Link to={eachItem.link} className="nav-links">
                      <li className="list-item" key={eachItem.id}>
                        <p className={activeStyle}>{eachItem.name}</p>
                      </li>
                    </Link>
                  )
                })}

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
                className="close-icon-btn"
                onClick={this.onClickClose}
              >
                <AiOutlineCloseCircle className="close-icon" />
              </button>{' '}
            </>
          ) : (
            ''
          )}
        </nav>
      </>
    )
  }
}

export default withRouter(Header)