import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {
  const addAnecdote = async event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createNotification(`you added anecdote '${content}'`, 3)
    props.createAnecdote(content)
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

const mapStateToProps = (state) => {
  return {
      filter: state.filter,
  }
}

const mapDispatchToProps = { createAnecdote, createNotification }

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm)
