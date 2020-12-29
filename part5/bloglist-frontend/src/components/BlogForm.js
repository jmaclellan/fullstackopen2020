import React, {useState} from 'react'

const BlogForm = ({createBlog}) => {
  const [newBlog, setNewBlog] = useState('')

  const handleChange = e => setNewBlog(e.target.value)

  const addBlog = e => {
    e.preventDefault()
    createBlog({

    })
  }

  return (
    <>
      <h2>Create a new blog</h2>

      <form onSubmit={addBlog}>
      <input
        value={newBlog}
        onChange={handleChange}
      />
      <button type="submit">save</button>
      </form>
    </>
  )
}

export default BlogForm