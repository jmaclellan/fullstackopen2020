import React from 'react'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <>
          username
          <input
            value={username}
            onChange={handleUsernameChange}
          />
        </>
        <>
          password
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm
