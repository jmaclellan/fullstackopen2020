import React from 'react'

const Comments = ({ comments, handleComment }) => {
  if (comments.length === 0) return null

  const addComment = event => {
    event.preventDefault()
    const content = event.target.comment.value
    event.target.comment.value = ''
    handleComment(content)
  }

  return (
    <div>
      <h3>comments</h3>
      <form onSubmit={addComment}>
        <input name='comment' />
        <button type='submit'>add comment</button>
      </form>
      {comments.map((comment, idx) =>
        <p key={idx}>{comment}</p>
      )}
    </div>
  )
}

export default Comments
