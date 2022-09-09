import {Component} from 'react'
import './index.css'
import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

class Login extends Component {
  state = {username: '', password: '', errorStatus: false, errorMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <div className="username-field">
        <label htmlFor="username">USER NAME</label>
        <input
          id="username"
          type="text"
          className="input-field"
          placeholder="Username"
          onChange={this.onChangeUsername}
          value={username}
        />
      </div>
    )
  }

  renderPasswordField = () => {
    const {password} = this.state

    return (
      <div className="username-field">
        <label htmlFor="pass">PASS WORD</label>
        <input
          id="pass"
          type="password"
          className="input-field"
          placeholder="Password"
          onChange={this.onChangePassword}
          value={password}
        />
      </div>
    )
  }

  onSubmitForm = event => {
    event.preventDefault()
    this.setState({username: '', password: ''})
    this.getData()
  }

  getData = async () => {
    const {username, password} = this.state
    const userdetails = {username, password}

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userdetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    this.setState({errorStatus: false})
    history.replace('/')
  }

  onSubmitFailure = errorMessage => {
    this.setState({errorMsg: errorMessage, errorStatus: true})
  }

  render() {
    const {errorStatus, errorMsg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <form className="login-container" onSubmit={this.onSubmitForm}>
        <div className="card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="login-logo"
          />
          {this.renderUsernameField()}
          {this.renderPasswordField()}
          {errorStatus && <p>{errorMsg}</p>}
          <div className="login-button-container">
            <button className="login-button" type="submit">
              Login
            </button>
          </div>
        </div>
      </form>
    )
  }
}

export default Login
