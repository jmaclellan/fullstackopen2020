import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer'
import loginService from '../services/login'
import { setNotification } from '../reducers/notificationReducer'
import storage from '../utils/storage'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      setUsername('')
      setPassword('')
      dispatch(login(user))
      dispatch(setNotification(`Hello ${user.name}`))
    } catch (error) {
      dispatch(setNotification('wrong credentials', 'error'))
    }
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <>
          username
          <input
            id='username'
            value={username}
            onChange={({target}) => setUsername(target.value)}
          />
        </>
        <>
          password
          <input
            id='password'
            value={password}
            onChange={({target}) => setPassword(target.value)}
          />
        </>
        <button id='login-button'>Login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm
