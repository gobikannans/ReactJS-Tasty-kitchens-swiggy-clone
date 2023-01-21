import {Link, withRouter} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'
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

  render() {
    const {showMobileView} = this.state

    return (
      <>
        <nav className="navbar-container">
          <div className="navbar-item-container">
            <Link to="/" className="nav-links">
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
              {navItemsList.map(eachItem => (
                <li className="list-item" key={eachItem.id}>
                  <Link to={eachItem.link} className="header-links">
                    <p className="normal-nav-item-style">{eachItem.name}</p>
                  </Link>
                </li>
              ))}

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
                {navItemsList.map(eachItem => (
                  <li
                    className="list-item"
                    key={eachItem.id}
                    onClick={this.onMobileNav}
                  >
                    <Link to={eachItem.link} className="header-links">
                      <p>{eachItem.name}</p>
                    </Link>
                  </li>
                ))}
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
                <AiFillCloseCircle className="close-icon" />
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
