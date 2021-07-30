import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { likeBlog, removeBlog, commentBlog } from '../reducers/blogReducer'
import Comments from './Comments'

const Blog = () => {
  const id = useParams().id
  const blog = useSelector(state => state.blogs.find(blog => blog.id = id))
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const history = useHistory()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if (!blog) return null

  const own = user && user.username === blog.user.username

  const handleLike = () => {
    dispatch(likeBlog(blog))
  }

  const handleRemove = () => {
    const okay = window.confirm(`Remove blog ${blog.title} by ${blog.name}?`)
    if (okay) {
      dispatch(removeBlog(id))
      history.push('/')
    }
  }

  const handleComment = comment => {
    dispatch(commentBlog(id, comment))
  }

  return (
    <div style={blogStyle} className='blog'>
      <h3>{blog.title} by {blog.author}</h3>
      <div>
        <div><a href={blog.ur}>{blog.url}</a></div>
        <div>
          likes {blog.likes}
          <button onClick={handleLike}>like</button>
        </div>
        {own && <button onClick={handleRemove}>remove</button>}
        <Comments
          comments={blog.comments}
          handleComment={handleComment}
        />
      </div>
    </div>
  )
}

export default Blog
