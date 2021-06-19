import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = ({ createAnecdote, setNotification }) => {
  const addAnecdote = async event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    createAnecdote(content)
    setNotification(`new anecdote '${content}'`, 5)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <input name='anecdote'/>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default connect(
  null,
  { createAnecdote, setNotification }
)(AnecdoteForm)
