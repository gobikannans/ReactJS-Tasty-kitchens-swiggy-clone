import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showErrorMsg: false, errorMsg: ''}

  usernameValue = event => {
    this.setState({username: event.target.value})
  }

  passwordValue = event => {
    this.setState({password: event.target.value})
  }

  submitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  submitFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()
    console.log(data)
    const jwtToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MjMwNjU1MzJ9.D13s5wN3Oh59aa_qtXMo3Ec4wojOx0EZh8Xr5C5sRkU'
    const errorMsg = "username and password didn't match"

    if (username === 'gobikannan' && password === '12345678') {
      this.submitSuccess(jwtToken)
    } else {
      this.submitFailure(errorMsg)
    }
  }

  onGuestLogin = () => {
    const jwtToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MjMwNjU1MzJ9.D13s5wN3Oh59aa_qtXMo3Ec4wojOx0EZh8Xr5C5sRkU'

    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  render() {
    const {username, password, showErrorMsg, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg-container">
        <div className="login-card">
          <div className="logo-container">
            <img
              src="https://res.cloudinary.com/dpjowvn70/image/upload/v1673347763/Vector1x_yu8nat.png"
              alt="website logo"
              className="website-logo"
            />
            <h1 className="company-heading">Tasty Kitchens</h1>
          </div>
          <div className="login-title-container">
            <h1 className="login-heading">Login</h1>
            <img
              src="https://res.cloudinary.com/dpjowvn70/image/upload/v1673372046/Rectangle_14571_qeoiah.png"
              alt="website log"
              className="small-landing-img"
            />
          </div>
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <label htmlFor="username" className="label">
              USERNAME
            </label>
            <input
              id="username"
              type="text"
              className="input"
              onChange={this.usernameValue}
              value={username}
            />
            <label htmlFor="password" className="label">
              PASSWORD
            </label>
            <input
              id="password"
              type="password"
              className="input"
              onChange={this.passwordValue}
              value={password}
            />
            {showErrorMsg ? <p className="error-msg">{errorMsg}</p> : ''}
            <button type="submit" className="login-btn">
              Login
            </button>
            <button
              type="button"
              className="guest-login-btn"
              onClick={this.onGuestLogin}
            >
              Guest Login
            </button>
          </form>
        </div>
        <div className="login-large-view">
          <img
            src="https://res.cloudinary.com/dpjowvn70/image/upload/v1673347766/Rectangle_1456_maa67m.png"
            alt="website login"
            className="large-landing-img"
          />
        </div>
      </div>
    )
  }
}

export default Login
