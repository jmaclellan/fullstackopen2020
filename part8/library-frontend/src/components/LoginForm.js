import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = ({ setError, setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN, {
    onError: error => {
      setError(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('lib-user-token', token)
    }
  }, [result.data])

  const submit = async event => {
    event.preventDefault()

    login({ variable: { username, password } })
  }

  return (
    <div>
      <form onSubmit={submit}>

      </form>
    </div>
  )
}